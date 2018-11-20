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
        required:  true,
      },
      deviceSerial:{
        type: String,
        required:  true,
      },
      deviceManufacturer: {
        type: String,
        required:  true,
      },
      deviceModel: {
        type: String,
        required:  true,
      },
      devicePlatform:{
        type: String,
        required:  true,
      },
      deviceVersion:{
        type: String,
        required:  true,
      },
})

//Middleware para Arzamenar e disparar a rotina do aprazamento.
const updatePreOpMiddleware = function(next) {
  const opConsumoRodelagem: OpConsumoRodelagem = this
  if(opConsumoRodelagem){
    PreOperacaoAprazamento.findByIdAndUpdate(opConsumoRodelagem.cdPreOperacaoAprazamento, 
      { $set: { status: true }}, { new: true }, function (err, document) {
      if (err) throw new NotFoundError(err);
      console.log(document)
    });
    next()
  }
}

opConsumoRodelagemSchema.pre('save', updatePreOpMiddleware)

export const OpConsumoRodelagem = mongoose.model<OpConsumoRodelagem>('OpConsumoRodelagem', opConsumoRodelagemSchema)