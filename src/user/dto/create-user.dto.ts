import { IsEmail, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsEmail()
  email: string;
}
