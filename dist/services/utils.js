"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNumber = isNumber;
function isNumber(key) {
    var number = parseInt(key, 10);
    return isNaN(number) ? false : true;
}
