import * as restify from 'restify'

import { alertaConsumoController } from '../controller/alerta-consumo-controller'


class AlertaConsumoRouter {

    applyRoutes(app: restify.Server){
      app.get('/', [alertaConsumoController.findAll])
      app.get('/alertaconsumos',       [alertaConsumoController.findAll])
      app.get('/alertaconsumos/:id',   [alertaConsumoController.validateId, alertaConsumoController.findById])
      app.post('/alertaconsumos',      [alertaConsumoController.save])
      app.put('/alertaconsumos/:id',   [alertaConsumoController.validateId, alertaConsumoController.replace])
      app.patch('/alertaconsumos/:id', [alertaConsumoController.validateId, alertaConsumoController.update])
      app.del('/alertaconsumos/:id',   [alertaConsumoController.validateId, alertaConsumoController.delete])
    }
  }
  
  export const alertaConsumoRouter = new AlertaConsumoRouter()