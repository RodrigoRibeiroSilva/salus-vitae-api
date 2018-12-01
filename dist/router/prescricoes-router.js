"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generic_router_1 = require("./generic-router");
const model_prescricoes_1 = require("../model/model.prescricoes");
class PrescricoesRouter extends generic_router_1.GenericRouter {
    constructor() {
        super(model_prescricoes_1.Prescricao);
    }
    prepareOne(query) {
        return query.populate('medicamentos')
            .populate('medicoId');
    }
    prepareAll(query) {
        return query.populate('medicamentos')
            .populate('medicoId');
    }
    applyRoutes(app) {
        app.get('/prescricoes', this.findAll);
        app.get('/prescricoes/:id', [this.validateId, this.findById]);
        app.post('/prescricoes', this.save);
    }
}
exports.prescricoesRouter = new PrescricoesRouter();
