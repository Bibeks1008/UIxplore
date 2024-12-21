import { IsNotEmpty } from 'class-validator';

export class AddWebsiteDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  url: string;

  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  fonts: string;

  @IsNotEmpty()
  colors: string;

  description: string;
}
