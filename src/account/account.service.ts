import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common'
import { CreateAccountDto } from './dtos/create-account.dto'
import { EventDto } from './dtos/event.dto'

export interface Account {
  id: string
  balance: number
}

@Injectable()
export class AccountService {
  private accounts: Record<string, Account> = {}

  reset() {
    this.accounts = {}
  }

  getBalance(id: string): Account | null {
    return this.accounts[id] || null
  }

  createAccount(dto: CreateAccountDto) {
    if (this.accounts[dto.id]) {
      throw new BadRequestException('Account already exists')
    }
    this.accounts[dto.id] = { id: dto.id, balance: dto.initialBalance }
    return { destination: this.accounts[dto.id] }
  }

  deposit(id: string, amount: number) {
    let account = this.accounts[id]
    if (!account) {
      // Create account if it doesn't exist
      account = { id, balance: 0 }
      this.accounts[id] = account
    }
    if (amount <= 0) {
      throw new BadRequestException('Deposit amount must be positive')
    }
    account.balance += amount
    return { destination: account }
  }

  withdraw(id: string, amount: number) {
    const account = this.accounts[id]
    if (!account) {
      throw new NotFoundException('Account not found')
    }
    if (amount <= 0) {
      throw new BadRequestException('Withdrawal amount must be positive')
    }
    if (account.balance < amount) {
      throw new BadRequestException('Insufficient funds')
    }
    account.balance -= amount
    return { origin: account }
  }

  transfer(fromId: string, toId: string, amount: number) {
    const fromAccount = this.accounts[fromId]
    let toAccount = this.accounts[toId]

    if (!fromAccount) {
      throw new NotFoundException('Source account not found')
    }

    if (!toAccount) {
      // Create destination account if it doesn't exist
      toAccount = { id: toId, balance: 0 }
      this.accounts[toId] = toAccount
    }

    if (amount <= 0) {
      throw new BadRequestException('Transfer amount must be positive')
    }
    if (fromAccount.balance < amount) {
      throw new BadRequestException('Insufficient funds')
    }

    fromAccount.balance -= amount
    toAccount.balance += amount
    return { origin: fromAccount, destination: toAccount }
  }

  handleEvent(dto: EventDto) {
    switch (dto.type) {
      case 'deposit':
        return this.deposit(dto.destination, dto.amount)
      case 'withdraw':
        return this.withdraw(dto.origin, dto.amount)
      case 'transfer':
        return this.transfer(dto.origin, dto.destination, dto.amount)
      default:
        throw new BadRequestException('Invalid event type')
    }
  }
}
