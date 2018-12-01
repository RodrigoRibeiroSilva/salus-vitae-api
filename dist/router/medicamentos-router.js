"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generic_router_1 = require("./generic-router");
const model_medicamentos_1 = require("../model/model-medicamentos");
class MedicamentosRouter extends generic_router_1.GenericRouter {
    constructor() {
        super(model_medicamentos_1.Medicamento);
    }
    applyRoutes(app) {
        app.get(`${this.basePath}`, this.findAll);
        app.get(`${this.basePath}/:id`, [this.validateId, this.findById]);
        app.post(`${this.basePath}`, this.save);
        app.put(`${this.basePath}/:id`, [this.validateId, this.replace]);
        app.patch(`${this.basePath}/:id`, [this.validateId, this.update]);
        app.del(`${this.basePath}/:id`, [this.validateId, this.delete]);
    }
}
exports.medicamentosRouter = new MedicamentosRouter();
