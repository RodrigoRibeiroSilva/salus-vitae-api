import { Controller } from './controller'
import { OpConsumoRodelagem } from "../model/model-op-consumo-rodelagem";

class OpConsumoRodelagemController extends Controller<OpConsumoRodelagem> {

    constructor(){
      super(OpConsumoRodelagem)
    }

    findAllByDevice = (req, res, next) => {
      this.model.find({deviceUuid: req.params.id})
          .then(this.renderAll(res,next))
          .catch(next)
    }
}
  
export const opConsumoRodelagemController = new OpConsumoRodelagemController()