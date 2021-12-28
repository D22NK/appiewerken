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
function utilRoutes(prisma, app) {
    app.get("/shiftfields", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const [tijdslots, uurlonen, betaalperiodes, winkels] = yield prisma.$transaction([
                prisma.tijdslots.findMany(),
                prisma.uurlonen.findMany(),
                prisma.betaalperiodes.findMany(),
                prisma.winkels.findMany(),
            ]);
            res.json({
                tijdslots: tijdslots,
                uurlonen: uurlonen,
                betaalperiodes: betaalperiodes,
                winkels: winkels,
            });
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }));
}
exports.default = utilRoutes;
