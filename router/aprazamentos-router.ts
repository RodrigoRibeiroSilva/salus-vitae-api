import { GenericRouter } from './generic-router'
import * as restify from 'restify'
import * as mongoose from 'mongoose'
import { Aprazamento } from "../model/model-aprazamentos";

class AprazamentosRouter extends GenericRouter<Aprazamento> {

    constructor(){
      super(Aprazamento)
    }

    protected prepareOne(query: mongoose.DocumentQuery<Aprazamento,Aprazamento>): mongoose.DocumentQuery<Aprazamento,Aprazamento>{
      return query.populate('paciente')
                  .populate('enfermeira')
                  .populate('medicamento')                                        
    }
    
    protected prepareAll(query: mongoose.DocumentQuery<Aprazamento[],Aprazamento>): mongoose.DocumentQuery<Aprazamento[],Aprazamento>{
      return query.populate('paciente')
                  .populate('enfermeira')
                  .populate('medicamento')                                      
    }

    applyRoutes(app: restify.Server){
      app.get('/aprazamentos', this.findAll)
      app.get('/aprazamentos/:id', [this.validateId, this.findById])
      app.post('/aprazamentos', this.save)
      app.put('/aprazamentos/:id', [this.validateId, this.replace])
      app.patch('/aprazamentos/:id', [this.validateId, this.update])
      app.del('/aprazamentos/:id', [this.validateId, this.delete])
    }
  }
  
  export const aprazamentosRouter = new AprazamentosRouter()
  