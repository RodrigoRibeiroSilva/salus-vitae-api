"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generic_router_1 = require("./generic.router");
const model_medicamentos_1 = require("../model/model.medicamentos");
class MedicamentosRouter extends generic_router_1.GenericRouter {
    constructor() {
        super(model_medicamentos_1.Medicamento);
    }
    applyRoutes(app) {
        app.get('/medicamentos', this.findAll);
        app.get('/medicamentos/:id', [this.validateId, this.findById]);
        app.post('/medicamentos', this.save);
        app.put('/medicamentos/:id', [this.validateId, this.replace]);
        app.patch('/medicamentos/:id', [this.validateId, this.update]);
        app.del('/medicamentos/:id', [this.validateId, this.delete]);
    }
}
exports.medicamentosRouter = new MedicamentosRouter();
