"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generic_router_1 = require("./generic.router");
const model_op_consumo_rodelagem_1 = require("../model/model-op-consumo-rodelagem");
class OpConsumoRodelagemRouter extends generic_router_1.GenericRouter {
    constructor() {
        super(model_op_consumo_rodelagem_1.OpConsumoRodelagem);
        this.findAllByDevice = (req, res, next) => {
            this.model.find({ deviceUuid: { $eq: '123' } })
                .then(this.renderAll(res, next))
                .catch(next);
        };
    }
    applyRoutes(app) {
        app.get('/opConsumoRodelagem', this.findAll);
        app.get('/opConsumoRodelagem/:id', [this.validateId, this.findById]);
        app.get('/opConsumoRodelagemDevice/:id', [this.validateId, this.findAllByDevice]);
        app.post('/opConsumoRodelagem', this.save);
        app.put('/opConsumoRodelagem/:id', [this.validateId, this.replace]);
        app.patch('/opConsumoRodelagem/:id', [this.validateId, this.update]);
        app.del('/opConsumoRodelagem/:id', [this.validateId, this.delete]);
    }
    prepareAllWhere(query, condiction) {
        return query.where('this.deviceUuid').equals(condiction);
    }
}
exports.opConsumoRodelagemRouter = new OpConsumoRodelagemRouter();
