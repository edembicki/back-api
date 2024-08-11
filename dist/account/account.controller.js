"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_account_dto_1 = require("./dtos/create-account.dto");
const event_dto_1 = require("./dtos/event.dto");
const account_service_1 = require("./account.service");
let AccountController = class AccountController {
    constructor(accountService) {
        this.accountService = accountService;
    }
    reset() {
        this.accountService.reset();
    }
    getBalance(accountId) {
        const account = this.accountService.getBalance(accountId);
        if (account) {
            return account;
        }
        throw new common_1.NotFoundException('Account not found');
    }
    handleEvent(eventDto) {
        return this.accountService.handleEvent(eventDto);
    }
};
exports.AccountController = AccountController;
__decorate([
    (0, common_1.Post)('/reset'),
    (0, swagger_1.ApiOperation)({ summary: 'Reset state before starting tests' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'State has been reset' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AccountController.prototype, "reset", null);
__decorate([
    (0, common_1.Get)('/balance'),
    (0, swagger_1.ApiOperation)({ summary: 'Get the balance of an account' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Balance retrieved',
        type: create_account_dto_1.CreateAccountDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Account not found' }),
    __param(0, (0, common_1.Query)('account_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AccountController.prototype, "getBalance", null);
__decorate([
    (0, common_1.Post)('/event'),
    (0, swagger_1.ApiOperation)({ summary: 'Create, deposit, withdraw, or transfer funds' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Event processed successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Account not found' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [event_dto_1.EventDto]),
    __metadata("design:returntype", void 0)
], AccountController.prototype, "handleEvent", null);
exports.AccountController = AccountController = __decorate([
    (0, swagger_1.ApiTags)('events'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [account_service_1.AccountService])
], AccountController);
//# sourceMappingURL=account.controller.js.map