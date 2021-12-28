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
function uurloonRoutes(prisma, app) {
    app.post("/uurlonen", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(req.body);
            const uurloon = yield prisma.uurlonen.create({
                data: {
                    leeftijd: req.body.leeftijd,
                    loon: req.body.uurloon,
                },
            });
            console.log(uurloon);
            res.sendStatus(200);
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }));
    app.get("/uurlonen", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const uurlonen = yield prisma.uurlonen.findMany({
                include: {
                    shifts: true,
                },
            });
            console.log("betalingen", uurlonen);
            res.json(uurlonen);
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }));
    app.get("/uurloon/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const uurloon = yield prisma.uurlonen.findUnique({
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
            console.log("uurloon", uurloon);
            res.json(uurloon);
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }));
}
exports.default = uurloonRoutes;
