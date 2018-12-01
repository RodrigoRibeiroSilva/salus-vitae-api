"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_op_consumo_rodelagem_1 = require("../model/model-op-consumo-rodelagem");
const generic_router_1 = require("./generic-router");
class OpConsumoRodelagemRouter extends generic_router_1.GenericRouter {
    constructor() {
        super(model_op_consumo_rodelagem_1.OpConsumoRodelagem);
        this.findAllByDevice = (req, res, next) => {
            this.model.find({ deviceUuid: req.params.id })
                .then(this.renderAll(res, next))
                .catch(next);
        };
    }
    applyRoutes(app) {
        app.get('/opConsumoRodelagem', this.findAll);
        app.get('/opConsumoRodelagem/:id', [this.validateId, this.findById]);
        app.get('/opConsumoRodelagemDevice/:id', this.findAllByDevice);
        app.post('/opConsumoRodelagem', this.save);
        app.put('/opConsumoRodelagem/:id', [this.validateId, this.replace]);
        app.patch('/opConsumoRodelagem/:id', [this.validateId, this.update]);
        app.del('/opConsumoRodelagem/:id', [this.validateId, this.delete]);
    }
}
exports.opConsumoRodelagemRouter = new OpConsumoRodelagemRouter();
