"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generic_router_1 = require("./generic-router");
const model_alerta_consumo_1 = require("../model/model-alerta-consumo");
class AlertaConsumoRouter extends generic_router_1.GenericRouter {
    constructor() {
        super(model_alerta_consumo_1.AlertaConsumo);
    }
    applyRoutes(app) {
        app.get('/notificacoes', this.findAll);
        app.get('/notificacoes/:id', [this.validateId, this.findById]);
        app.post('/notificacoes', this.save);
        app.put('/notificacoes/:id', [this.validateId, this.replace]);
        app.patch('/notificacoes/:id', [this.validateId, this.update]);
        app.del('/notificacoes/:id', [this.validateId, this.delete]);
    }
}
exports.alertaConsumoRouter = new AlertaConsumoRouter();
