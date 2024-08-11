import { CreateAccountDto } from './dtos/create-account.dto';
import { EventDto } from './dtos/event.dto';
export interface Account {
    id: string;
    balance: number;
}
export declare class AccountService {
    private accounts;
    reset(): void;
    getBalance(id: string): Account | null;
    createAccount(dto: CreateAccountDto): {
        destination: Account;
    };
    deposit(id: string, amount: number): {
        destination: Account;
    };
    withdraw(id: string, amount: number): {
        origin: Account;
    };
    transfer(fromId: string, toId: string, amount: number): {
        origin: Account;
        destination: Account;
    };
    handleEvent(dto: EventDto): {
        destination: Account;
    } | {
        origin: Account;
    };
}
