"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const winkelRoutes_1 = __importDefault(require("./winkelRoutes"));
const betaalRoutes_1 = __importDefault(require("./betaalRoutes"));
const uurloonRoutes_1 = __importDefault(require("./uurloonRoutes"));
const tijdslotRoutes_1 = __importDefault(require("./tijdslotRoutes"));
const shiftsRoutes_1 = __importDefault(require("./shiftsRoutes"));
const utilRoutes_1 = __importDefault(require("./utilRoutes"));
const prisma = new client_1.PrismaClient();
function routes(app) {
    app.options("*", (req, res) => {
        res.sendStatus(200);
    });
    app.get("/", (req, res) => {
        res.json({ info: "AppieWerken Server" });
    });
    (0, winkelRoutes_1.default)(prisma, app);
    (0, betaalRoutes_1.default)(prisma, app);
    (0, uurloonRoutes_1.default)(prisma, app);
    (0, tijdslotRoutes_1.default)(prisma, app);
    (0, shiftsRoutes_1.default)(prisma, app);
    (0, utilRoutes_1.default)(prisma, app);
    app.use("*", (req, res) => {
        res.sendStatus(404);
    });
}
exports.default = routes;
