import { GenericRouter } from './generic.router'
import * as restify from 'restify'
import { Medicamento } from "../model/model.medicamentos";

class MedicamentosRouter extends GenericRouter<Medicamento> {

    constructor(){
      super(Medicamento)
    }

    applyRoutes(app: restify.Server){
      app.get('/medicamentos', this.findAll)
      app.get('/medicamentos/:id', [this.validateId, this.findById])
      app.post('/medicamentos', this.save)
      app.put('/medicamentos/:id', [this.validateId, this.replace])
      app.patch('/medicamentos/:id', [this.validateId, this.update])
      app.del('/medicamentos/:id', [this.validateId, this.delete])
    }
  }
  
  export const medicamentosRouter = new MedicamentosRouter()
  