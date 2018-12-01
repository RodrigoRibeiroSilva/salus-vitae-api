import { GenericRouter } from './generic-router'
import * as mongoose from 'mongoose'
import * as restify from 'restify'
import { Prontuario } from "../model/model-prontuarios";


class ProntuariosRouter extends GenericRouter<Prontuario> {

    constructor(){
      super(Prontuario)
    }

    protected prepareOne(query: mongoose.DocumentQuery<Prontuario,Prontuario>): mongoose.DocumentQuery<Prontuario,Prontuario>{
      return query.populate('idPaciente')
                  .populate('prescricoes')
                                               
    }
    
    protected prepareAll(query: mongoose.DocumentQuery<Prontuario[],Prontuario>): mongoose.DocumentQuery<Prontuario[],Prontuario>{
      return query.populate('idPaciente')
                  .populate('prescricoes')
                                               
    }  

    applyRoutes(app: restify.Server){
        app.get('/prontuarios', this.findAll)  
        app.get('/prontuarios/:id', [this.validateId, this.findById])
        app.post('/prontuarios', this.save)
    }
  }
  
  export const prontuariosRouter = new ProntuariosRouter()
  