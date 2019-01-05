import { GenericRouter } from './generic-router'
import * as restify from 'restify'
import { AlertaConsumo } from "../model/model-alerta-consumo";

class AlertaConsumoRouter extends GenericRouter<AlertaConsumo> {

    constructor(){
      super(AlertaConsumo)
    }

    applyRoutes(app: restify.Server){
      app.get('/alertaconsumos', this.findAll)
      app.get('/alertaconsumos/:id', [this.validateId, this.findById])
      app.post('/alertaconsumos', this.save)
      app.put('/alertaconsumos/:id', [this.validateId, this.replace])
      app.patch('/alertaconsumos/:id', [this.validateId, this.update])
      app.del('/alertaconsumos/:id', [this.validateId, this.delete])
    }
  }
  
  export const alertaConsumoRouter = new AlertaConsumoRouter()
  