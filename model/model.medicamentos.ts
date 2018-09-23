import * as mongoose from 'mongoose'


export interface Medicamento extends mongoose.Document {
    nome: string,
    dosagem: string,
    dataFabricacao: Date,
    dataValidade: Date

  }

const medicamentoSchema = new mongoose.Schema({
      nome: {
        type: String,
        required:  true
      },
      dosagem: {
        type: String,
        required:  true
      },
      dataFabricacao: {
        type: Date,
        required:  true
      },
      dataValidade: {
        type: Date,
        required:  true
      }
})

export const Medicamento = mongoose.model<Medicamento>('Medicamento', medicamentoSchema)