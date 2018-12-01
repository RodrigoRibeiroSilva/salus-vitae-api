"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generic_router_1 = require("./generic-router");
const model_prescricoes_1 = require("../model/model.prescricoes");
class PrescricoesRouter extends generic_router_1.GenericRouter {
    constructor() {
        super(model_prescricoes_1.Prescricao);
    }
    prepareOne(query) {
        return query.populate('medicamentos')
            .populate('medicoId');
    }
    prepareAll(query) {
        return query.populate('medicamentos')
            .populate('medicoId');
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
    applyRoutes(app) {
        app.get('/prescricoes', this.findAll);
        app.get('/prescricoes/:id', [this.validateId, this.findById]);
        app.post('/prescricoes', this.save);
    }
}
exports.prescricoesRouter = new PrescricoesRouter();
