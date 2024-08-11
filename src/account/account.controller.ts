import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateAccountDto } from './dtos/create-account.dto';
import { EventDto } from './dtos/event.dto';
import { AccountService } from './account.service';

@ApiTags('events')
@Controller()
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('/reset')
  @ApiOperation({ summary: 'Reset state before starting tests' })
  @ApiResponse({ status: 200, description: 'State has been reset' })
  reset() {
    this.accountService.reset();
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
      return account;
    }
    throw new NotFoundException('Account not found');
  }

  @Post('/event')
  @ApiOperation({ summary: 'Create, deposit, withdraw, or transfer funds' })
  @ApiResponse({ status: 201, description: 'Event processed successfully' })
  @ApiResponse({ status: 404, description: 'Account not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  handleEvent(@Body() eventDto: EventDto) {
    return this.accountService.handleEvent(eventDto);
  }
}
