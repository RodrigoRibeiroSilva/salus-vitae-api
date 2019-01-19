import * as restify from 'restify'

import { preOperacaoAprazamentoController } from '../controller/preop-aprazamento-controller'


class PreOperacaoAprazamentoRouter {

    applyRoutes(app: restify.Server){
      app.get('/preoperacaoaprazamentos',       [preOperacaoAprazamentoController.findAll])
      app.get('/preoperacaoaprazamentos/:id',   [preOperacaoAprazamentoController.validateId, preOperacaoAprazamentoController.findById])
      app.post('/preoperacaoaprazamentos',      [preOperacaoAprazamentoController.save])
      app.put('/preoperacaoaprazamentos/:id',   [preOperacaoAprazamentoController.validateId, preOperacaoAprazamentoController.replace])
      app.patch('/preoperacaoaprazamentos/:id', [preOperacaoAprazamentoController.validateId, preOperacaoAprazamentoController.update])
      app.del('/preoperacaoaprazamentos/:id',   [preOperacaoAprazamentoController.validateId, preOperacaoAprazamentoController.delete])
    }
    
  }
  
  export const preOperacaoAprazamentoRouter = new PreOperacaoAprazamentoRouter()
  