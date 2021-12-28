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
Object.defineProperty(exports, "__esModule", { value: true });
function tijdslotRoutes(prisma, app) {
    app.post("/tijdslots", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(req.body.uren);
            const tijdslot = yield prisma.tijdslots.create({
                data: {
                    slot: req.body.slot,
                    begin: req.body.begin,
                    eind: req.body.eind,
                    uren: parseFloat(req.body.uren),
                },
            });
            console.log(tijdslot);
            res.sendStatus(200);
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }));
    app.get("/tijdslots", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const tijdslots = yield prisma.tijdslots.findMany({
                include: {
                    shifts: true,
                },
            });
            console.log("periodes", tijdslots);
            res.json(tijdslots);
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }));
    app.get("/tijdslot/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const tijdslot = yield prisma.tijdslots.findUnique({
                where: {
                    id: req.params.id,
                },
                include: {
                    shifts: {
                        include: {
                            winkel: true,
                            tijdslot: true,
                        },
                        orderBy: [
                            {
                                datum: "desc",
                            },
                        ],
                    },
                },
            });
            console.log("tijdslot", tijdslot);
            res.json(tijdslot);
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }));
}
exports.default = tijdslotRoutes;
