"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generic_router_1 = require("./generic.router");
const model_prescricao_1 = require("../model/model.prescricao");
class PrescricoesRouter extends generic_router_1.GenericRouter {
    constructor() {
        super(model_prescricao_1.Prescricao);
    }
    prepareOne(query) {
        return query.populate('medicamentos');
    }
    prepareAll(query) {
        return query.populate('medicamentos');
    }
    applyRoutes(app) {
        app.get('/prescricoes', this.findAll);
        app.get('/prescricoes/:id', [this.validateId, this.findById]);
        app.post('/prescricoes', this.save);
    }
}
exports.prescricoesRouter = new PrescricoesRouter();
