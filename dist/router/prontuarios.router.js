"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generic_router_1 = require("./generic.router");
const model_prontuarios_1 = require("../model/model.prontuarios");
class ProntuariosRouter extends generic_router_1.GenericRouter {
    constructor() {
        super(model_prontuarios_1.Prontuario);
    }
    prepareOne(query) {
        return query.populate('idPaciente')
            .populate('prescricoes');
    }
    prepareAll(query) {
        return query.populate('idPaciente')
            .populate('prescricoes');
    }
    applyRoutes(app) {
        app.get('/prontuarios', this.findAll);
        app.get('/prontuarios/:id', [this.validateId, this.findById]);
        app.post('/prontuarios', this.save);
    }
}
exports.prontuariosRouter = new ProntuariosRouter();
