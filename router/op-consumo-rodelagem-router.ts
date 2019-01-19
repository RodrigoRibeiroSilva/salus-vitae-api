import * as restify from 'restify'

import { opConsumoRodelagemController } from '../controller/op-consumo-rodelagem-controller'

class OpConsumoRodelagemRouter {

    applyRoutes(app: restify.Server){
      app.get('/opconsumorodelagems',       [opConsumoRodelagemController.findAll])
      app.get('/opconsumorodelagems/:id',   [opConsumoRodelagemController.validateId, opConsumoRodelagemController.findById])
      app.get('/opconsumorodelagems/:id',   [opConsumoRodelagemController.findAllByDevice])
      app.post('/opconsumorodelagems',      [opConsumoRodelagemController.save])
      app.put('/opconsumorodelagems/:id',   [opConsumoRodelagemController.validateId, opConsumoRodelagemController.replace])
      app.patch('/opconsumorodelagems/:id', [opConsumoRodelagemController.validateId, opConsumoRodelagemController.update])
      app.del('/opconsumorodelagems/:id',   [opConsumoRodelagemController.validateId, opConsumoRodelagemController.delete])
    }
}
  
  export const opConsumoRodelagemRouter = new OpConsumoRodelagemRouter()
  