"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generic_router_1 = require("./generic.router");
const model_aprazamentos_1 = require("../model/model.aprazamentos");
class AprazamentosRouter extends generic_router_1.GenericRouter {
    constructor() {
        super(model_aprazamentos_1.Aprazamento);
    }
    prepareOne(query) {
        return query.populate('paciente')
            .populate('enfermeira')
            .populate('medicamento');
    }
    prepareAll(query) {
        return query.populate('paciente')
            .populate('enfermeira')
            .populate('medicamento');
    }
    applyRoutes(app) {
        app.get('/aprazamentos', this.findAll);
        app.get('/aprazamentos/:id', [this.validateId, this.findById]);
        app.post('/aprazamentos', this.save);
        app.put('/aprazamentos/:id', [this.validateId, this.replace]);
        app.patch('/aprazamentos/:id', [this.validateId, this.update]);
        app.del('/aprazamentos/:id', [this.validateId, this.delete]);
    }
}
exports.aprazamentosRouter = new AprazamentosRouter();
