import { Controller } from './controller'
import { AlertaConsumo } from "../model/model-alerta-consumo";

class AlertaConsumoController extends Controller<AlertaConsumo> {

    constructor(){
      super(AlertaConsumo)
    }
}
  
export const alertaConsumoController = new AlertaConsumoController()