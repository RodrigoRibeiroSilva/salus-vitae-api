import * as restify from 'restify'


import { OpConsumoRodelagem } from '../model/model-op-consumo-rodelagem';
import { GenericRouter } from './generic-router'

class OpConsumoRodelagemRouter extends GenericRouter<OpConsumoRodelagem> {

    constructor(){
      super(OpConsumoRodelagem)
    }

    applyRoutes(app: restify.Server){
      app.get('/opconsumorodelagems', this.findAll)
      app.get('/opconsumorodelagems/:id', [this.validateId, this.findById])
      app.get('/opconsumorodelagems/:id', this.findAllByDevice)
      app.post('/opconsumorodelagems', this.save)
      app.put('/opconsumorodelagems/:id', [this.validateId, this.replace])
      app.patch('/opconsumorodelagems/:id', [this.validateId, this.update])
      app.del('/opconsumorodelagems/:id', [this.validateId, this.delete])
    }

    findAllByDevice = (req, res, next) => {
      this.model.find({deviceUuid: req.params.id})
          .then(this.renderAll(res,next))
          .catch(next)
    }
  }
  
  export const opConsumoRodelagemRouter = new OpConsumoRodelagemRouter()
  