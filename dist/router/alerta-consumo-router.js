"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generic_router_1 = require("./generic-router");
const model_alerta_consumo_1 = require("../model/model-alerta-consumo");
class AlertaConsumoRouter extends generic_router_1.GenericRouter {
    constructor() {
        super(model_alerta_consumo_1.AlertaConsumo);
    }
    applyRoutes(app) {
        app.get('/alertaconsumos', this.findAll);
        app.get('/alertaconsumos/:id', [this.validateId, this.findById]);
        app.post('/alertaconsumos', this.save);
        app.put('/alertaconsumos/:id', [this.validateId, this.replace]);
        app.patch('/alertaconsumos/:id', [this.validateId, this.update]);
        app.del('/alertaconsumos/:id', [this.validateId, this.delete]);
    }
}
exports.alertaConsumoRouter = new AlertaConsumoRouter();
