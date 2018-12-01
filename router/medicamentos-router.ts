import { GenericRouter } from './generic-router'
import * as restify from 'restify'
import { Medicamento } from "../model/model-medicamentos";

class MedicamentosRouter extends GenericRouter<Medicamento> {

    constructor(){
      super(Medicamento)
    }

    applyRoutes(app: restify.Server){
      app.get(`${this.basePath}`, this.findAll)
      app.get(`${this.basePath}/:id`, [this.validateId, this.findById])
      app.post(`${this.basePath}`, this.save)
      app.put(`${this.basePath}/:id`, [this.validateId, this.replace])
      app.patch(`${this.basePath}/:id`, [this.validateId, this.update])
      app.del(`${this.basePath}/:id`, [this.validateId, this.delete])
    }
  }

  export const medicamentosRouter = new MedicamentosRouter()
  