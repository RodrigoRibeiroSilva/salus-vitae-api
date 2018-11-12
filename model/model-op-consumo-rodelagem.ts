import * as mongoose from 'mongoose'
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

export const OpConsumoRodelagem = mongoose.model<OpConsumoRodelagem>('OpConsumoRodelagem', opConsumoRodelagemSchema)