"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const TicketTraking_1 = __importDefault(require("../../models/TicketTraking"));
const FindOrCreateATicketTrakingService = async ({ ticketId, companyId, whatsappId, userId, ratingId }) => {
    const ticketTraking = await TicketTraking_1.default.findOne({
        where: {
            ticketId,
            finishedAt: {
                [sequelize_1.Op.is]: null
            }
        }
    });
    if (ticketTraking) {
        await TicketTraking_1.default.update({
            ratingId,
        }, {
            where: {
                id: ticketTraking.id
            }
        });
        return ticketTraking;
    }
    const newRecord = await TicketTraking_1.default.create({
        ticketId,
        companyId,
        whatsappId,
        userId,
        ratingId
    });
    return newRecord;
};
exports.default = FindOrCreateATicketTrakingService;
