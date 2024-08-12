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
  Res,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateAccountDto } from './dtos/create-account.dto';
import { EventDto } from './dtos/event.dto';
import { AccountService } from './account.service';
import { Response } from 'express';

@ApiTags('events')
@Controller()
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('reset')
  @HttpCode(200)
  @ApiOperation({ summary: 'Reset the banking system state' })
  @ApiResponse({ status: 200, description: 'State successfully reset.' })
  reset() {
    this.accountService.reset();
    return 'OK';
  }

  @Get('/balance')
  @ApiOperation({ summary: 'Get the balance of an account' })
  @ApiResponse({
    status: 200,
    description: 'Balance retrieved',
    type: CreateAccountDto,
  })
  @ApiResponse({ status: 404, description: 'Account not found' })
  getBalance(@Query('account_id') accountId: string, @Res() res: Response) {
    const account = this.accountService.getBalance(accountId);
    if (account) {
      return res.status(HttpStatus.OK).json(account.balance);
    }
    // Return 404 status with a response body of 0
    return res.status(HttpStatus.NOT_FOUND).json(0);
  }

  @Post('/event')
  @ApiOperation({ summary: 'Create, deposit, withdraw, or transfer funds' })
  @ApiResponse({ status: 201, description: 'Event processed successfully' })
  @ApiResponse({
    status: 404,
    description: 'Account not found, returns 0 in the response body',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async handleEvent(@Body() eventDto: EventDto, @Res() res: Response) {
    try {
      const result = await this.accountService.handleEvent(eventDto);
      return res.status(HttpStatus.CREATED).json(result);
    } catch (error) {
      if (error instanceof NotFoundException) {
        // Return 404 status with a response body of 0
        return res.status(HttpStatus.NOT_FOUND).json(0);
      }
      throw error;
    }
  }
}
