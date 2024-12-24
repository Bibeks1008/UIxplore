import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class AuthEmailDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class AuthVerifyDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  code: string;
}
