import { GenericRouter } from './generic-router'
import * as restify from 'restify'
import { PreOperacaoAprazamento } from '../model/model-preop-aprazamento';



class PreOperacaoAprazamentoRouter extends GenericRouter<PreOperacaoAprazamento> {

    constructor(){
      super(PreOperacaoAprazamento)
    }

    applyRoutes(app: restify.Server){
      app.get('/preoperacaoaprazamentos', this.findAll)
      app.get('/preoperacaoaprazamentos/:id', [this.validateId, this.findById])
      app.post('/preoperacaoaprazamentos', this.save)
      app.put('/preoperacaoaprazamentos/:id', [this.validateId, this.replace])
      app.patch('/preoperacaoaprazamentos/:id', [this.validateId, this.update])
      app.del('/preoperacaoaprazamentos/:id', [this.validateId, this.delete])
    }
    
  }
  
  export const preOperacaoAprazamentoRouter = new PreOperacaoAprazamentoRouter()
  