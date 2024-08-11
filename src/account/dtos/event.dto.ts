import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNumber } from 'class-validator'

export class EventDto {
  @ApiProperty({ example: 'deposit' })
  @IsString()
  type: string

  @ApiProperty({ example: '100' })
  @IsString()
  destination?: string

  @ApiProperty({ example: '200' })
  @IsString()
  origin?: string

  @ApiProperty({ example: 10 })
  @IsNumber()
  amount: number
}
