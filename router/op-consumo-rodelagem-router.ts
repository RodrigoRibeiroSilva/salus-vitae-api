import * as restify from 'restify'


import { OpConsumoRodelagem } from '../model/model-op-consumo-rodelagem';
import { GenericRouter } from './generic.router'

class OpConsumoRodelagemRouter extends GenericRouter<OpConsumoRodelagem> {

    constructor(){
      super(OpConsumoRodelagem)
    }

    applyRoutes(app: restify.Server){
      app.get('/opConsumoRodelagem', this.findAll)
      app.get('/opConsumoRodelagem/:id', [this.validateId, this.findById])
      app.get('/opConsumoRodelagemDevice/:id', this.findAllByDevice)
      app.post('/opConsumoRodelagem', this.save)
      app.put('/opConsumoRodelagem/:id', [this.validateId, this.replace])
      app.patch('/opConsumoRodelagem/:id', [this.validateId, this.update])
      app.del('/opConsumoRodelagem/:id', [this.validateId, this.delete])
    }

    findAllByDevice = (req, res, next) => {
      this.model.find({deviceUuid: req.params.id})
          .then(this.renderAll(res,next))
          .catch(next)
    }
  }
  
  export const opConsumoRodelagemRouter = new OpConsumoRodelagemRouter()
  