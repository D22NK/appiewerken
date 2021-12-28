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
function betaalRoutes(prisma, app) {
    app.post("/periodes", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const periode = yield prisma.betaalperiodes.create({
                data: {
                    startDatum: req.body.start + "T00:00:00.000Z",
                    eindDatum: req.body.eind + "T00:00:00.000Z",
                    persoonlijkeBonus: req.body.persoonlijkebonus,
                    winstuitkering: req.body.winstuitkering,
                    slug: req.body.slug,
                },
            });
            console.log(periode);
            res.sendStatus(200);
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }));
    app.get("/periodes", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const periodes = yield prisma.betaalperiodes.findMany({
                include: {
                    shifts: true,
                },
                orderBy: [
                    {
                        startDatum: "desc",
                    },
                ],
            });
            console.log("periodes", periodes);
            res.json(periodes);
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }));
    app.get("/periode/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const periode = yield prisma.betaalperiodes.findUnique({
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
            console.log("periode", periode);
            res.json(periode);
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }));
    app.post("/betalingen", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(req.body);
            const betaling = yield prisma.betalingen.create({
                data: {
                    betaalPeriodeId: req.body.periode,
                    bedrag: parseFloat(req.body.bedrag),
                    ontvangstdatum: req.body.datum + "T00:00:00.000Z",
                },
            });
            console.log(betaling);
            res.sendStatus(200);
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }));
    app.get("/betalingen", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const betalingen = yield prisma.betalingen.findMany({
                orderBy: [
                    {
                        ontvangstdatum: "desc",
                    },
                ],
                include: {
                    betaalPeriode: {
                        include: {
                            shifts: true,
                        },
                    },
                },
            });
            console.log("betalingen", betalingen);
            res.json(betalingen);
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }));
    app.get("/betaling/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const betaling = yield prisma.betalingen.findUnique({
                where: {
                    id: req.params.id,
                },
                include: {
                    betaalPeriode: {
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
                    },
                },
            });
            console.log("betaling", betaling);
            res.json(betaling);
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }));
}
exports.default = betaalRoutes;
