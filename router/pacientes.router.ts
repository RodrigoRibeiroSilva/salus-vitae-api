import { GenericRouter } from './generic.router'
import * as restify from 'restify'
import { Paciente } from '../model/model.pacientes'

class PacientesRouter extends GenericRouter<Paciente> {

    constructor(){
      super(Paciente)
    }
  
    applyRoutes(app: restify.Server){
      app.get('/pacientes', this.findAll)
      app.get('/pacientes/:id', [this.validateId, this.findById])
      app.post('/pacientes', this.save)
      app.put('/pacientes/:id', [this.validateId, this.replace])
      app.patch('/pacientes/:id', [this.validateId, this.update])
      app.del('/pacientes/:id', [this.validateId, this.delete])
    }
  }
  
  export const pacientesRouter = new PacientesRouter()
  