import { Controller } from './controller'
import { PreOperacaoAprazamento } from '../model/model-preop-aprazamento';

class PreOperacaoAprazamentoController extends Controller<PreOperacaoAprazamento> {

    constructor(){
      super(PreOperacaoAprazamento)
    }
}
  
export const preOperacaoAprazamentoController = new PreOperacaoAprazamentoController()