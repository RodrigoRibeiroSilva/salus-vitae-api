"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const alerta_consumo_controller_1 = require("../controller/alerta-consumo-controller");
class AlertaConsumoRouter {
    applyRoutes(app) {
        app.get('/', [alerta_consumo_controller_1.alertaConsumoController.findAll]);
        app.get('/alertaconsumos', [alerta_consumo_controller_1.alertaConsumoController.findAll]);
        app.get('/alertaconsumos/:id', [alerta_consumo_controller_1.alertaConsumoController.validateId, alerta_consumo_controller_1.alertaConsumoController.findById]);
        app.post('/alertaconsumos', [alerta_consumo_controller_1.alertaConsumoController.save]);
        app.put('/alertaconsumos/:id', [alerta_consumo_controller_1.alertaConsumoController.validateId, alerta_consumo_controller_1.alertaConsumoController.replace]);
        app.patch('/alertaconsumos/:id', [alerta_consumo_controller_1.alertaConsumoController.validateId, alerta_consumo_controller_1.alertaConsumoController.update]);
        app.del('/alertaconsumos/:id', [alerta_consumo_controller_1.alertaConsumoController.validateId, alerta_consumo_controller_1.alertaConsumoController.delete]);
    }
}
exports.alertaConsumoRouter = new AlertaConsumoRouter();
