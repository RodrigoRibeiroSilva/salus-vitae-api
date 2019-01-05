"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generic_router_1 = require("./generic-router");
const model_preop_aprazamento_1 = require("../model/model-preop-aprazamento");
class PreOperacaoAprazamentoRouter extends generic_router_1.GenericRouter {
    constructor() {
        super(model_preop_aprazamento_1.PreOperacaoAprazamento);
    }
    applyRoutes(app) {
        app.get('/preoperacaoaprazamentos', this.findAll);
        app.get('/preoperacaoaprazamentos/:id', [this.validateId, this.findById]);
        app.post('/preoperacaoaprazamentos', this.save);
        app.put('/preoperacaoaprazamentos/:id', [this.validateId, this.replace]);
        app.patch('/preoperacaoaprazamentos/:id', [this.validateId, this.update]);
        app.del('/preoperacaoaprazamentos/:id', [this.validateId, this.delete]);
    }
}
exports.preOperacaoAprazamentoRouter = new PreOperacaoAprazamentoRouter();
