"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var bikeQuery_1 = require("../services/bikeQuery");
var router = express_1.default.Router();
// Get's all the bikes from the db
router.get("/bikes", bikeQuery_1.getAllBikes);
// Add new Bike 
router.post("/bikes", bikeQuery_1.addnewBike);
// Update details of existing bike
router.put("/bikes/:id", bikeQuery_1.updateBike);
// Delete a specific bike 
router.delete("/bikes/:id", bikeQuery_1.deleteBike);
exports.default = router;
