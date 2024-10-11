"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBikes = getAllBikes;
exports.addnewBike = addnewBike;
exports.updateBike = updateBike;
exports.deleteBike = deleteBike;
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
var response_1 = require("../dto/response");
function getAllBikes(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var bikes, output, err_1, result, status_1, message, responseCode;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, prisma.bike.findMany({ orderBy: { createdAt: "desc" } })];
                case 1:
                    bikes = _a.sent();
                    output = { responseCode: 1, message: "successfully fetched bikes", data: bikes };
                    res.status(200).json(output);
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    result = (0, response_1.getExactError)(err_1);
                    status_1 = result.status, message = result.message, responseCode = result.responseCode;
                    res.status(status_1).json({ responseCode: responseCode, message: message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function addnewBike(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, model, year, type, make, yearInt, bike, err_2, result, status_2, message, responseCode;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, model = _a.model, year = _a.year, type = _a.type, make = _a.make;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    yearInt = parseInt(year, 10);
                    if (isNaN(yearInt)) {
                        throw new response_1.ClientError(400, "Year should be a valid Number string");
                    }
                    else if (!model || !year || !make) {
                        throw new response_1.ClientError(400, "Provide all required fields (model,year,make)");
                    }
                    return [4 /*yield*/, prisma.bike.create({ data: {
                                year: yearInt,
                                type: type,
                                model: model,
                                make: make
                            } })];
                case 2:
                    bike = _b.sent();
                    res.status(201).json({ responseCode: 1, message: "Successfully added bike", data: bike });
                    return [2 /*return*/];
                case 3:
                    err_2 = _b.sent();
                    result = (0, response_1.getExactError)(err_2);
                    status_2 = result.status, message = result.message, responseCode = result.responseCode;
                    res.status(status_2).json({ responseCode: responseCode, message: message });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function updateBike(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, updateData, year, yearInt, bike, err_3, result, status_3, message, responseCode;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    updateData = req.body;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    year = updateData.year;
                    yearInt = typeof year === "string" ? parseInt(year, 10) : year;
                    if (year && isNaN(yearInt)) {
                        throw new response_1.ClientError(400, "Year should be Number string / Number");
                    }
                    return [4 /*yield*/, prisma.bike.update({
                            where: { id: id },
                            data: __assign(__assign({}, updateData), { year: yearInt })
                        })];
                case 2:
                    bike = _a.sent();
                    if (!bike) {
                        throw new response_1.ClientError(400, "Bike not found");
                    }
                    else {
                        res.status(200).json({ responseCode: 1, message: "successfully updated bike data", data: bike });
                    }
                    return [3 /*break*/, 4];
                case 3:
                    err_3 = _a.sent();
                    result = (0, response_1.getExactError)(err_3);
                    status_3 = result.status, message = result.message, responseCode = result.responseCode;
                    res.status(status_3).json({ responseCode: responseCode, message: message });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function deleteBike(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, bike, err_4, result, status_4, message, responseCode;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, prisma.bike.delete({ where: { id: id } })];
                case 2:
                    bike = _a.sent();
                    if (!bike) {
                        throw new response_1.ClientError(400, "Bike not found");
                    }
                    else {
                        res.status(200).json({ responseCode: 1, message: "successfully deleted bike data", data: bike });
                    }
                    return [3 /*break*/, 4];
                case 3:
                    err_4 = _a.sent();
                    result = (0, response_1.getExactError)(err_4);
                    status_4 = result.status, message = result.message, responseCode = result.responseCode;
                    res.status(status_4).json({ responseCode: responseCode, message: message });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
