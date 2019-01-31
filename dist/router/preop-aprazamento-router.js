"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const preop_aprazamento_controller_1 = require("../controller/preop-aprazamento-controller");
class PreOperacaoAprazamentoRouter {
    applyRoutes(app) {
        app.get('/preoperacaoaprazamentos', [preop_aprazamento_controller_1.preOperacaoAprazamentoController.findAll]);
        app.get('/preoperacaoaprazamentos/:id', [preop_aprazamento_controller_1.preOperacaoAprazamentoController.validateId, preop_aprazamento_controller_1.preOperacaoAprazamentoController.findById]);
        app.post('/preoperacaoaprazamentos', [preop_aprazamento_controller_1.preOperacaoAprazamentoController.save]);
        app.put('/preoperacaoaprazamentos/:id', [preop_aprazamento_controller_1.preOperacaoAprazamentoController.validateId, preop_aprazamento_controller_1.preOperacaoAprazamentoController.replace]);
        app.patch('/preoperacaoaprazamentos/:id', [preop_aprazamento_controller_1.preOperacaoAprazamentoController.validateId, preop_aprazamento_controller_1.preOperacaoAprazamentoController.update]);
        app.del('/preoperacaoaprazamentos/:id', [preop_aprazamento_controller_1.preOperacaoAprazamentoController.validateId, preop_aprazamento_controller_1.preOperacaoAprazamentoController.delete]);
    }
}
exports.preOperacaoAprazamentoRouter = new PreOperacaoAprazamentoRouter();
