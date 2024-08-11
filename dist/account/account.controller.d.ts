import { EventDto } from './dtos/event.dto';
import { AccountService } from './account.service';
export declare class AccountController {
    private readonly accountService;
    constructor(accountService: AccountService);
    reset(): void;
    getBalance(accountId: string): import("./account.service").Account;
    handleEvent(eventDto: EventDto): {
        destination: import("./account.service").Account;
    } | {
        origin: import("./account.service").Account;
    };
}
