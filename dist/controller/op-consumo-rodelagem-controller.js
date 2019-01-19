"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("./controller");
const model_op_consumo_rodelagem_1 = require("../model/model-op-consumo-rodelagem");
class OpConsumoRodelagemController extends controller_1.Controller {
    constructor() {
        super(model_op_consumo_rodelagem_1.OpConsumoRodelagem);
        this.findAllByDevice = (req, res, next) => {
            this.model.find({ deviceUuid: req.params.id })
                .then(this.renderAll(res, next))
                .catch(next);
        };
    }
}
exports.opConsumoRodelagemController = new OpConsumoRodelagemController();
