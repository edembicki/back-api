"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountService = void 0;
const common_1 = require("@nestjs/common");
let AccountService = class AccountService {
    constructor() {
        this.accounts = {};
    }
    reset() {
        this.accounts = {};
    }
    getBalance(id) {
        return this.accounts[id] || null;
    }
    createAccount(dto) {
        if (this.accounts[dto.id]) {
            throw new common_1.BadRequestException('Account already exists');
        }
        this.accounts[dto.id] = { id: dto.id, balance: dto.initialBalance };
        return { destination: this.accounts[dto.id] };
    }
    deposit(id, amount) {
        let account = this.accounts[id];
        if (!account) {
            account = { id, balance: 0 };
            this.accounts[id] = account;
        }
        if (amount <= 0) {
            throw new common_1.BadRequestException('Deposit amount must be positive');
        }
        account.balance += amount;
        return { destination: account };
    }
    withdraw(id, amount) {
        const account = this.accounts[id];
        if (!account) {
            throw new common_1.NotFoundException('Account not found');
        }
        if (amount <= 0) {
            throw new common_1.BadRequestException('Withdrawal amount must be positive');
        }
        if (account.balance < amount) {
            throw new common_1.BadRequestException('Insufficient funds');
        }
        account.balance -= amount;
        return { origin: account };
    }
    transfer(fromId, toId, amount) {
        const fromAccount = this.accounts[fromId];
        let toAccount = this.accounts[toId];
        if (!fromAccount) {
            throw new common_1.NotFoundException('Source account not found');
        }
        if (!toAccount) {
            toAccount = { id: toId, balance: 0 };
            this.accounts[toId] = toAccount;
        }
        if (amount <= 0) {
            throw new common_1.BadRequestException('Transfer amount must be positive');
        }
        if (fromAccount.balance < amount) {
            throw new common_1.BadRequestException('Insufficient funds');
        }
        fromAccount.balance -= amount;
        toAccount.balance += amount;
        return { origin: fromAccount, destination: toAccount };
    }
    handleEvent(dto) {
        switch (dto.type) {
            case 'deposit':
                return this.deposit(dto.destination, dto.amount);
            case 'withdraw':
                return this.withdraw(dto.origin, dto.amount);
            case 'transfer':
                return this.transfer(dto.origin, dto.destination, dto.amount);
            default:
                throw new common_1.BadRequestException('Invalid event type');
        }
    }
};
exports.AccountService = AccountService;
exports.AccountService = AccountService = __decorate([
    (0, common_1.Injectable)()
], AccountService);
//# sourceMappingURL=account.service.js.map