import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  NotFoundException,
  HttpCode,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateAccountDto } from './dtos/create-account.dto';
import { EventDto } from './dtos/event.dto';
import { AccountService } from './account.service';

@ApiTags('events')
@Controller()
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('reset')
  @HttpCode(200) // Sets the status code to 200
  @ApiOperation({ summary: 'Reset the banking system state' })
  @ApiResponse({ status: 200, description: 'State successfully reset.' })
  reset() {
    this.accountService.reset();
    // Return a response body with "OK"
    return 'OK' // Include "OK" in the response body
  }

  @Get('/balance')
  @ApiOperation({ summary: 'Get the balance of an account' })
  @ApiResponse({
    status: 200,
    description: 'Balance retrieved',
    type: CreateAccountDto,
  })
  @ApiResponse({ status: 404, description: 'Account not found' })
  getBalance(@Query('account_id') accountId: string) {
    const account = this.accountService.getBalance(accountId);
    if (account) {
      return account.balance;
    }
    return 0;
  }

  @Post('/event')
  @ApiOperation({ summary: 'Create, deposit, withdraw, or transfer funds' })
  @ApiResponse({ status: 201, description: 'Event processed successfully' })
  @ApiResponse({ status: 404, description: 'Account not found, returns 0 in the response body' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async handleEvent(@Body() eventDto: EventDto) {
    try {
      const result = await this.accountService.handleEvent(eventDto);
      return result; // Return the successful result
    } catch (error) {
      if (error instanceof NotFoundException) {
        // Return 0 in the response body with a 404 status code
        return 0; 
      }
      // Rethrow other exceptions
      throw error;
    }
  }
}
