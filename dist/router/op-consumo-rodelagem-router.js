"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const op_consumo_rodelagem_controller_1 = require("../controller/op-consumo-rodelagem-controller");
class OpConsumoRodelagemRouter {
    applyRoutes(app) {
        app.get('/opconsumorodelagems', [op_consumo_rodelagem_controller_1.opConsumoRodelagemController.findAll]);
        app.get('/opconsumorodelagems/:id', [op_consumo_rodelagem_controller_1.opConsumoRodelagemController.validateId, op_consumo_rodelagem_controller_1.opConsumoRodelagemController.findById]);
        app.get('/opconsumorodelagems/:id', [op_consumo_rodelagem_controller_1.opConsumoRodelagemController.findAllByDevice]);
        app.post('/opconsumorodelagems', [op_consumo_rodelagem_controller_1.opConsumoRodelagemController.save]);
        app.put('/opconsumorodelagems/:id', [op_consumo_rodelagem_controller_1.opConsumoRodelagemController.validateId, op_consumo_rodelagem_controller_1.opConsumoRodelagemController.replace]);
        app.patch('/opconsumorodelagems/:id', [op_consumo_rodelagem_controller_1.opConsumoRodelagemController.validateId, op_consumo_rodelagem_controller_1.opConsumoRodelagemController.update]);
        app.del('/opconsumorodelagems/:id', [op_consumo_rodelagem_controller_1.opConsumoRodelagemController.validateId, op_consumo_rodelagem_controller_1.opConsumoRodelagemController.delete]);
    }
}
exports.opConsumoRodelagemRouter = new OpConsumoRodelagemRouter();
