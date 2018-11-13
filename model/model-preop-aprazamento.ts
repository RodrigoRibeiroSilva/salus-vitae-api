import * as mongoose from 'mongoose'
import { server } from '../main'
import { NotFoundError } from 'restify-errors';
import { setAprazamento } from '../controller/aprazamento-controller'

export interface PreOperacaoAprazamento extends mongoose.Document {
    //Dados do Aprazamento
    status: string,
    cdProntuario: number,
    cdAtendimento: number,
    cdPrescricao: number,
    dtPreOpAprazamento: Date,
    horarioInicial: Date,
    intervalo: number,
    //Dados do medicamento Aprazado
    cdItem: number,
    cdTpItem: number,
    ordemItem: number,
    quantidade: number
  }

const preOperacaoAprazamentoSchema = new mongoose.Schema({
  //Dados do Aprazamento
      status:{
        type: String,
        required: false,
      },

      cdProntuario: {
        type: Number,
        required:  true
      },
    
      cdAtendimento: {
        type: Number,
        required:  true
      },

      cdPrescricao: {
        type: Number,
        required:  true
      },

      dtPreOpAprazamento: {
        type: Date,
        required: true
      },
      
      horarioInicial: {
        type: Date,
        required: true
      },

      intervalo: {
        type: Number,
        required: true
      },

  //Dados do medicamento que foi aprazado
    cdItem: {
      type: Number,
      required:  true
    },
      
    cdTpItem: {
      type: Number,
      required:  true
    },
     
    ordemItem: {
      type: Number,
      required:  true
    },
    
    quantidade: {
      type: Number,
      required:  true
    }
    
})

//Middleware para Arzamenar e disparar a rotina do aprazamento.
const saveMiddleware = function(next) {
  const preOperacaoAprazamento: PreOperacaoAprazamento = this

  if(preOperacaoAprazamento){
    let aprazamento = iniciaTimeOut(preOperacaoAprazamento)
    server.aprazamentos.set(preOperacaoAprazamento._id, aprazamento )
    for (var [key, value] of server.aprazamentos) {
      console.log('Chave: ' + key + " Valor " + value);
    }
    next()

  }else{
    throw new NotFoundError('Erro ao inserir o aprazamento.')
  }
}

//Middleware para atualizar a rotina da notificação do aprazamento.
const updateMiddleware = function(next) {
  const preOperacaoAprazamento: PreOperacaoAprazamento = this
  server.aprazamentos.forEach(function(key , value){
    if(key === preOperacaoAprazamento._id){
      clearTimeout(value)
      server.aprazamentos[preOperacaoAprazamento._id] = iniciaTimeOut(preOperacaoAprazamento)
      console.log(server.aprazamentos)
    }
  })
  next()
}

const iniciaTimeOut = function (preOperacaoAprazamento: PreOperacaoAprazamento ){
  //Dados da pre-operação
  let horas = preOperacaoAprazamento.horarioInicial.getHours();
  let minutos = preOperacaoAprazamento.horarioInicial.getMinutes();
  let segundos = preOperacaoAprazamento.horarioInicial.getSeconds();
  let intervalo = preOperacaoAprazamento.intervalo

  //Dados da rotina de notificação
  let horaInicialAprazamento = (( horas * 60 +  minutos )* 60 + segundos ) * 1000
  let intervaloAprazamento = (( 0*60 + intervalo ) * 60 +  0) * 1000

  let aprazamentoNotification = setAprazamento(function(timeout) {
    //Lógica para o envio do push notification
    console.log("Aprazei")
    //console.log(server.aprazamentos.)
 }
  , horaInicialAprazamento, intervaloAprazamento, (( 0 * 60 +  0) * 60 + 0) * 1000); 

  return aprazamentoNotification
}

preOperacaoAprazamentoSchema.pre('save', saveMiddleware)
preOperacaoAprazamentoSchema.pre('findOneAndUpdate', updateMiddleware)
preOperacaoAprazamentoSchema.pre('update', updateMiddleware)

export const PreOperacaoAprazamento = mongoose.model<PreOperacaoAprazamento>('PreOperacaoAprazamento', preOperacaoAprazamentoSchema)