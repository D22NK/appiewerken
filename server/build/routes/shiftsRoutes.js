"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const notify_1 = __importDefault(require("../utils/notify"));
function shiftsRoutes(prisma, app) {
    app.post("/shifts", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const shift = yield prisma.shifts.create({
                data: {
                    datum: req.body.datum + "T00:00:00.000Z",
                    jaarWeek: req.body.jaarWeek,
                    dag: req.body.dag,
                    tijdslotId: req.body.tijdslotId,
                    urenGewerkt: parseFloat(req.body.urenGewerkt),
                    urenBetaald: parseFloat(req.body.urenBetaald),
                    voltooid: req.body.voltooid,
                    winkelId: req.body.winkelId,
                    uurloonId: req.body.uurloonId,
                    feestdag: req.body.feestdag,
                    betaalperiodeId: req.body.betaalperiodeId,
                },
                include: {
                    tijdslot: true,
                },
            });
            console.log(shift);
            (0, notify_1.default)(`1 nieuwe shift voor Daan op ${req.body.datum} van ${shift.tijdslot.slot.split("-")[0]} tot ${shift.tijdslot.slot.split("-")[1]} `);
            res.sendStatus(200);
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }));
    app.get("/shifts", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const shifts = yield prisma.shifts.findMany({
                orderBy: [
                    {
                        datum: "desc",
                    },
                ],
                include: {
                    winkel: true,
                    tijdslot: true,
                    uurloon: true,
                    betaalperiode: true,
                },
            });
            console.log("shifts", shifts);
            res.json(shifts);
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }));
    app.get("/shifts/voltooid", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const shifts = yield prisma.shifts.findMany({
                orderBy: [
                    {
                        datum: "desc",
                    },
                ],
                include: {
                    winkel: true,
                    tijdslot: true,
                    uurloon: true,
                    betaalperiode: true,
                },
                where: {
                    voltooid: true,
                },
            });
            console.log("shifts", shifts);
            res.json(shifts);
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }));
    app.get("/shifts/onvoltooid", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const shifts = yield prisma.shifts.findMany({
                orderBy: [
                    {
                        datum: "desc",
                    },
                ],
                include: {
                    winkel: true,
                    tijdslot: true,
                    uurloon: true,
                    betaalperiode: true,
                },
                where: {
                    voltooid: false,
                },
            });
            console.log("shifts", shifts);
            res.json(shifts);
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }));
    app.get("/shift/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const shift = yield prisma.shifts.findUnique({
                where: {
                    id: req.params.id,
                },
                include: {
                    winkel: true,
                    tijdslot: true,
                    betaalperiode: true,
                    uurloon: true,
                },
            });
            console.log("shift", shift);
            res.json(shift);
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }));
}
exports.default = shiftsRoutes;
