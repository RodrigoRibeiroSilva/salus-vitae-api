import * as mongoose from 'mongoose'


export interface Paciente extends mongoose.Document {
    nome: string,
    nomeSocial: string,
    sexo: string,
    dataNascimento: Date,
    numeroRg: string,
    numeroCpf: string,
    nomeMae: string,
    nomePai: string,
    alergias: string[]
    
  }

const pacienteSchema = new mongoose.Schema({
    nome: {
      type: String,
      required:  true
    },

    nomeSocial: {
      type: String,
      required:  false
    },

    sexo: {
      type: String,
      required:  true
    },

    dataNascimento: {
      type: Date,
      required:  true
    },

    numeroRg: {
      type: String,
      required:  true
    },

    numeroCpf: {
      type: String,
      required:  true
    },

    nomeMae: {
      type: String,
      required:  true
    },

    nomePai: {
      type: String,
      required:  true
    },

    alergias: [{
      descricao: String
    }]

})

export const Paciente = mongoose.model<Paciente>('Paciente', pacienteSchema)