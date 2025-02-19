"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../../errors/AppError"));
const CheckContactOpenTickets_1 = __importDefault(require("../../helpers/CheckContactOpenTickets"));
const GetDefaultWhatsApp_1 = __importDefault(require("../../helpers/GetDefaultWhatsApp"));
const Ticket_1 = __importDefault(require("../../models/Ticket"));
const ShowContactService_1 = __importDefault(require("../ContactServices/ShowContactService"));
const socket_1 = require("../../libs/socket");
const CreateTicketService = async ({ contactId, status, userId, queueId, companyId }) => {
    const defaultWhatsapp = await (0, GetDefaultWhatsApp_1.default)(companyId);
    await (0, CheckContactOpenTickets_1.default)(contactId);
    const { isGroup } = await (0, ShowContactService_1.default)(contactId, companyId);
    const [{ id }] = await Ticket_1.default.findOrCreate({
        where: {
            contactId,
            companyId
        },
        defaults: {
            contactId,
            companyId,
            whatsappId: defaultWhatsapp.id,
            status,
            isGroup,
            userId,
            isBot: true,
        }
    });
    await Ticket_1.default.update({ companyId, queueId, userId, status: "open", isBot: true }, { where: { id } });
    const ticket = await Ticket_1.default.findByPk(id, { include: ["contact", "queue"] });
    if (!ticket) {
        throw new AppError_1.default("ERR_CREATING_TICKET");
    }
    const io = (0, socket_1.getIO)();
    // io.to(ticket.id.toString()).emit("ticket", {
    io.to(ticket.id.toString()).emit(`company-${ticket.companyId}-ticket`, {
        action: "update",
        ticket
    });
    return ticket;
};
exports.default = CreateTicketService;
