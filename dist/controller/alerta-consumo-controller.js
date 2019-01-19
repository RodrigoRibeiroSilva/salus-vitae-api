"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("./controller");
const model_alerta_consumo_1 = require("../model/model-alerta-consumo");
class AlertaConsumoController extends controller_1.Controller {
    constructor() {
        super(model_alerta_consumo_1.AlertaConsumo);
    }
}
exports.alertaConsumoController = new AlertaConsumoController();
