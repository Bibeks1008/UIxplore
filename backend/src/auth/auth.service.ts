import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schemas';
import { AuthEmailDto, AuthVerifyDto } from './dto/auth.dto';
import * as crypto from 'crypto';
import * as SendGrid from '@sendgrid/mail';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async sendVerificationCode(dto: AuthEmailDto) {
    const email = dto.email.toLocaleLowerCase().trim();

    const code = crypto.randomInt(100000, 999999).toString();

    let user = await this.userModel.findOneAndUpdate(
      { email },
      { verificationCode: code, codeExpires: Date.now() + 15 * 60 * 1000 },
      { upsert: true, new: true },
    );

    SendGrid.setApiKey(this.configService.get('SENDGRID_API_KEY'));

    const mail: SendGrid.MailDataRequired = {
      to: email,
      subject: 'Your Verification Code',
      from: 'dreamhigh.bibek@gmail.com',
      text: `Your verification code is ${code}.`,
      html: `
    <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 20px;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    background: #ffffff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    color: #333333;
                }
                .code {
                    font-size: 24px;
                    font-weight: bold;
                    color: #007bff;
                    padding: 10px;
                    border: 2px solid #007bff;
                    border-radius: 4px;
                    display: inline-block;
                    margin: 20px 0;
                }
                p {
                    color: #555555;
                    line-height: 1.6;
                }
                .footer {
                    margin-top: 20px;
                    font-size: 12px;
                    color: #aaaaaa;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Email Verification</h1>
                <p>Thank you for registering! Please use the following verification code to complete your registration:</p>
                <div class="code">${code}</div>
                <p>If you did not request this, please ignore this email.</p>
                <p>Best regards,<br>UIxplore</p>
                <div class="footer">This email was sent automatically. Please do not reply.</div>
            </div>
        </body>
    </html>
    `,
    };

    let message: string = 'Email sent successfully!';

    try {
      const tranport = await SendGrid.send(mail);
    } catch (err) {
      message = 'Failed to send email!';
    }

    delete user.verificationCode;

    return { message, payload: { user } };
  }

  async verifyCode(dto: AuthVerifyDto) {
    const email = dto.email.toLocaleLowerCase().trim();
    const code = dto.code;

    const user = await this.userModel.findOne({ email: email });

    if (
      !user ||
      user.verificationCode !== code ||
      user.codeExpires.getTime() < Date.now()
    ) {
      throw new ForbiddenException('Invalid or expired verification code.');
    }

    const token = this.jwtService.sign(
      {
        sub: user._id,
        email: user.email,
      },
      {
        expiresIn: '60m',
        secret: this.configService.get('JWT_SECRET'),
      },
    );

    user.verificationCode = null;
    user.codeExpires = null;
    user.isVerified = true;
    user.sessionExpiresAt = new Date(Date.now() + 7 * 24 * 30 * 60 * 1000);

    const userData = await user.save();

    return {
      message: 'Logged in successfully.',
      payload: {
        data: {
          token,
          userData,
        },
      },
    };
  }
}
