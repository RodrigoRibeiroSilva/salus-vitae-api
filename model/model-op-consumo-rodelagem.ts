import * as mongoose from 'mongoose'


import { NotFoundError } from 'restify-errors';
import { PreOperacaoAprazamento } from './model-preop-aprazamento'


export interface OpConsumoRodelagem extends mongoose.Document {
    cdPreOperacaoAprazamento: mongoose.Types.ObjectId | PreOperacaoAprazamento,
    isConsumido: boolean,
    dtOperacao: Date,
    justificativa: string,
    deviceUuid: string,  
    deviceSerial : string,
    deviceManufacturer: string,
    deviceModel: string,
    devicePlatform: string,
    deviceVersion: string

    nmUsuario: string
  }

const opConsumoRodelagemSchema = new mongoose.Schema({
     
      cdPreOperacaoAprazamento:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PreOperacaoAprazamento',
        required: true
      },

      isConsumido: {
        type: Boolean,
        required:  true
      },
    
      dtOperacao: {
        type: Date,
        required: true
      },

      justificativa:{
        type: String,
        required:  false,
      },

      //Informações do aparelho e do profissional de saude que ministrou
      deviceUuid:{
        type: String,
        required:  false,
      },
      deviceSerial:{
        type: String,
        required:  false,
      },
      deviceManufacturer: {
        type: String,
        required:  false,
      },
      deviceModel: {
        type: String,
        required:  false,
      },
      devicePlatform:{
        type: String,
        required:  false,
      },
      deviceVersion:{
        type: String,
        required:  false,
      },

      nmUsuario: {
        type: String,
        required: false
      }
      
})

//Middleware para Arzamenar e disparar a rotina do aprazamento.
const updatePreOpMiddleware = function(next) {
  const opConsumoRodelagem: OpConsumoRodelagem = this

  if(mongoose.Types.ObjectId.isValid(opConsumoRodelagem._id)){
    PreOperacaoAprazamento.findByIdAndUpdate(opConsumoRodelagem.cdPreOperacaoAprazamento, 
      { $set: { status: false } , _id: opConsumoRodelagem.cdPreOperacaoAprazamento }, { new: true }, function (err, document) {
      if (err) throw new NotFoundError(err);
      console.log(document)
    });
    next()
  
  }else{
    throw new NotFoundError('Código da pré-operação inválido');
  }
}

opConsumoRodelagemSchema.pre('save', updatePreOpMiddleware)

export const OpConsumoRodelagem = mongoose.model<OpConsumoRodelagem>('OpConsumoRodelagem', opConsumoRodelagemSchema)