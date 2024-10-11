"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientError = void 0;
exports.getExactError = getExactError;
var client_1 = require("@prisma/client");
// Custom Error class to know that its a ClientSide Error
var ClientError = /** @class */ (function (_super) {
    __extends(ClientError, _super);
    function ClientError(_status, message) {
        var _this = _super.call(this, message) || this;
        _this.status = _status;
        Object.setPrototypeOf(_this, ClientError.prototype);
        return _this;
    }
    return ClientError;
}(Error));
exports.ClientError = ClientError;
function getExactError(err) {
    var message, status, responseCode;
    if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
            message = 'Unique constraint failed on the field:' + err.meta.target;
        }
        else if (err.code === 'P2025') {
            message = 'Record not found.';
        }
        else if (err.code === 'P2014') {
            message = 'Foreign key constraint failed.';
        }
        else if (err.code === 'P2003') {
            message = 'Required field missing.';
        }
        else if (err.code === 'P1012') {
            message = err.message;
        }
        else {
            message = 'An unknown error occurred:';
        }
        status = 401;
        responseCode = 2;
    }
    else if (err instanceof ClientError) {
        status = err.status;
        message = err.message;
        responseCode = 4;
    }
    else {
        status = 500;
        message = err.message;
        responseCode = 0;
    }
    return {
        responseCode: responseCode,
        message: message,
        status: status
    };
}
