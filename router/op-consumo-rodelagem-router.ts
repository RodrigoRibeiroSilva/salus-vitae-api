import { GenericRouter } from './generic.router'
import * as restify from 'restify'
import * as mongoose from 'mongoose'
import { OpConsumoRodelagem } from '../model/model-op-consumo-rodelagem';

class OpConsumoRodelagemRouter extends GenericRouter<OpConsumoRodelagem> {

    constructor(){
      super(OpConsumoRodelagem)
    }

    applyRoutes(app: restify.Server){
      app.get('/opConsumoRodelagem', this.findAll)
      app.get('/opConsumoRodelagem/:id', [this.validateId, this.findById])
      app.get('/opConsumoRodelagemDevice/:id', [this.validateId, this.findAllByDevice])
      app.post('/opConsumoRodelagem', this.save)
      app.put('/opConsumoRodelagem/:id', [this.validateId, this.replace])
      app.patch('/opConsumoRodelagem/:id', [this.validateId, this.update])
      app.del('/opConsumoRodelagem/:id', [this.validateId, this.delete])
    }

    findAllByDevice = (req, res, next) => {
      this.model.find({deviceUuid: {$eq: '123'}})
          .then(this.renderAll(res,next))
          .catch(next)
    }
    
      prepareAllWhere(query: mongoose.DocumentQuery<OpConsumoRodelagem[],OpConsumoRodelagem>, condiction : String): mongoose.DocumentQuery<OpConsumoRodelagem[],OpConsumoRodelagem>{
      return query.where('this.deviceUuid').equals(condiction)
                                               
    }
  }
  
  export const opConsumoRodelagemRouter = new OpConsumoRodelagemRouter()
  