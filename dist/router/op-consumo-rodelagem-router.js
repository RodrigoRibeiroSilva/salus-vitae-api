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
        app.get('/opconsumorodelagems', this.findAll);
        app.get('/opconsumorodelagems/:id', [this.validateId, this.findById]);
        app.get('/opconsumorodelagems/:id', this.findAllByDevice);
        app.post('/opconsumorodelagems', this.save);
        app.put('/opconsumorodelagems/:id', [this.validateId, this.replace]);
        app.patch('/opconsumorodelagems/:id', [this.validateId, this.update]);
        app.del('/opconsumorodelagems/:id', [this.validateId, this.delete]);
    }
}
exports.opConsumoRodelagemRouter = new OpConsumoRodelagemRouter();
