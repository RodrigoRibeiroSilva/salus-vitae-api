import { GenericRouter } from './generic-router'
import * as restify from 'restify'
import { PreOperacaoAprazamento } from '../model/model-preop-aprazamento';



class PreOperacaoAprazamentoRouter extends GenericRouter<PreOperacaoAprazamento> {

    constructor(){
      super(PreOperacaoAprazamento)
    }

    applyRoutes(app: restify.Server){
      app.get('/preOpAprazamentos', this.findAll)
      app.get('/preOpAprazamentos/:id', [this.validateId, this.findById])
      app.post('/preOpAprazamentos', this.save)
      app.put('/preOpAprazamentos/:id', [this.validateId, this.replace])
      app.patch('/preOpAprazamentos/:id', [this.validateId, this.update])
      app.del('/preOpAprazamentos/:id', [this.validateId, this.delete])
    }
    
  }
  
  export const preOperacaoAprazamentoRouter = new PreOperacaoAprazamentoRouter()
  