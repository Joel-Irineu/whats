"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Rating_1 = __importDefault(require("../../models/Rating"));
const ListService = async ({ searchParam, pageNumber = "1", companyId }) => {
    let whereCondition = {};
    const limit = 20;
    const offset = limit * (+pageNumber - 1);
    if (searchParam) {
        whereCondition = {
            [sequelize_1.Op.or]: [{ name: { [sequelize_1.Op.like]: `%${searchParam}%` } }]
        };
    }
    const { count, rows: ratings } = await Rating_1.default.findAndCountAll({
        where: { companyId, ...whereCondition },
        limit,
        offset,
        order: [["name", "ASC"]]
    });
    const hasMore = count > offset + ratings.length;
    return {
        ratings,
        count,
        hasMore
    };
};
exports.default = ListService;
