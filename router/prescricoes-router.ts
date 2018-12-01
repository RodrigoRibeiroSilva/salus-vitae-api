import { GenericRouter } from './generic-router'
import * as restify from 'restify'
import * as mongoose from 'mongoose'
import { Prescricao } from "../model/model.prescricoes";
import { NotFoundError } from 'restify-errors';


class PrescricoesRouter extends GenericRouter<Prescricao> {

    constructor(){
      super(Prescricao)
    }

    protected prepareOne(query: mongoose.DocumentQuery<Prescricao,Prescricao>): mongoose.DocumentQuery<Prescricao,Prescricao>{
      return query.populate('medicamentos')  
                  .populate('medicoId')                                        
    }

    protected prepareAll(query: mongoose.DocumentQuery<Prescricao[],Prescricao>): mongoose.DocumentQuery<Prescricao[],Prescricao>{
      return query.populate('medicamentos')    
                  .populate('medicoId')                                    
    }

   /*  envelope(document){
      let resource = super.envelope(document)
      resource._links.medicamentos = `${this.basePath}/${resource._id}` 
    }

    findByMenu = (req , res , next) => {
      Prescricao.findById(req.params.id, "+medicamento")
      .then(presc => {
        if(!presc){
          throw new NotFoundError ('Medicamento não encontrado')
        }else{
          res.json(presc.medicamentos)
          return next()
        }
      })
    } */

    applyRoutes(app: restify.Server){
      app.get('/prescricoes', this.findAll)
      app.get('/prescricoes/:id', [this.validateId, this.findById])
      app.post('/prescricoes', this.save)
    }
  }
  
  export const prescricoesRouter = new PrescricoesRouter()
  