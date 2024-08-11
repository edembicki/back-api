import { ApiProperty } from '@nestjs/swagger'

export class CreateAccountDto {
  @ApiProperty({
    example: '123',
    description: 'Unique identifier for the account',
  })
  id: string

  @ApiProperty({ example: 100, description: 'Initial balance for the account' })
  initialBalance: number
}
