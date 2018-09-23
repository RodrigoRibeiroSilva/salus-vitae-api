"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generic_router_1 = require("./generic.router");
const model_pacientes_1 = require("../model/model.pacientes");
class PacientesRouter extends generic_router_1.GenericRouter {
    constructor() {
        super(model_pacientes_1.Paciente);
    }
    applyRoutes(app) {
        app.get('/pacientes', this.findAll);
        app.get('/pacientes/:id', [this.validateId, this.findById]);
        app.post('/pacientes', this.save);
        app.put('/pacientes/:id', [this.validateId, this.replace]);
        app.patch('/pacientes/:id', [this.validateId, this.update]);
        app.del('/pacientes/:id', [this.validateId, this.delete]);
    }
}
exports.pacientesRouter = new PacientesRouter();
