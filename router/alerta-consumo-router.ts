import { GenericRouter } from './generic-router'
import * as restify from 'restify'
import { AlertaConsumo } from "../model/model-alerta-consumo";

class AlertaConsumoRouter extends GenericRouter<AlertaConsumo> {

    constructor(){
      super(AlertaConsumo)
    }

    applyRoutes(app: restify.Server){
      app.get('/notificacoes', this.findAll)
      app.get('/notificacoes/:id', [this.validateId, this.findById])
      app.post('/notificacoes', this.save)
      app.put('/notificacoes/:id', [this.validateId, this.replace])
      app.patch('/notificacoes/:id', [this.validateId, this.update])
      app.del('/notificacoes/:id', [this.validateId, this.delete])
    }
  }
  
  export const alertaConsumoRouter = new AlertaConsumoRouter()
  