import * as mongoose from 'mongoose'
import { PreOperacaoAprazamento } from './model-preop-aprazamento'

export interface OpConsumoRodelagem extends mongoose.Document {
    cdPreOperacaoAprazamento: mongoose.Types.ObjectId | PreOperacaoAprazamento,
    isConsumido: boolean,
    dtOperacao: Date,
    justificativa: string,
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
})

export const OpConsumoRodelagem = mongoose.model<OpConsumoRodelagem>('OpConsumoRodelagem', opConsumoRodelagemSchema)