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
function winkelRoutes(prisma, app) {
    app.get("/winkels", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const winkels = yield prisma.winkels.findMany({
            include: {
                shifts: true,
            },
        });
        console.log(winkels);
        res.json(winkels);
    }));
    app.get("/winkel/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const winkel = yield prisma.winkels.findUnique({
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
        console.log("winkel", winkel);
        res.json(winkel);
    }));
    app.post("/winkels", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const winkel = yield prisma.winkels.create({
                data: {
                    winkelNr: req.body.winkelnummer,
                    adres: req.body.adres,
                },
            });
            console.log(winkel);
            res.sendStatus(200);
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }));
    app.delete("/winkel/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const winkel = yield prisma.winkels.delete({
                where: {
                    id: req.params.id,
                },
            });
            console.log(winkel);
            res.sendStatus(200);
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }));
}
exports.default = winkelRoutes;
