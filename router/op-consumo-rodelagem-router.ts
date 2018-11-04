import { GenericRouter } from './generic.router'
import * as restify from 'restify'
import { OpConsumoRodelagem } from '../model/model-op-consumo-rodelagem';

class OpConsumoRodelagemRouter extends GenericRouter<OpConsumoRodelagem> {

    constructor(){
      super(OpConsumoRodelagem)
    }

    applyRoutes(app: restify.Server){
      app.get('/opConsumoRodelagem', this.findAll)
      app.get('/opConsumoRodelagem/:id', [this.validateId, this.findById])
      app.post('/opConsumoRodelagem', this.save)
      app.put('/opConsumoRodelagem/:id', [this.validateId, this.replace])
      app.patch('/opConsumoRodelagem/:id', [this.validateId, this.update])
      app.del('/opConsumoRodelagem/:id', [this.validateId, this.delete])
    }

    
  }
  
  export const opConsumoRodelagemRouter = new OpConsumoRodelagemRouter()
  