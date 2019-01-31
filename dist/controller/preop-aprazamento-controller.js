"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("./controller");
const model_preop_aprazamento_1 = require("../model/model-preop-aprazamento");
class PreOperacaoAprazamentoController extends controller_1.Controller {
    constructor() {
        super(model_preop_aprazamento_1.PreOperacaoAprazamento);
    }
}
exports.preOperacaoAprazamentoController = new PreOperacaoAprazamentoController();
