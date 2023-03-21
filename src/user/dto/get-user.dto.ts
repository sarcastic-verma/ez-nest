import { IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GetUserDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty()
  @Type(() => Number)
  id?: number;
}
