"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const pino_1 = __importDefault(require("pino"));
const logger = (0, pino_1.default)({
    transport: {
        target: 'pino-pretty',
        options: {
            levelFirst: true,
            // translateTime: true,
            translateTime: 'dd/mm/yyyy HH:MM:ss',
            colorize: true,
            ignore: "pid,hostname",
            // include: 'level,time',
            // mkdir: true, // create the target destination
        }
    }
});
exports.logger = logger;
