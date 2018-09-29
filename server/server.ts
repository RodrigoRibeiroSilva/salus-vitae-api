import * as restify from 'restify'
import * as mongoose from 'mongoose'
import * as cors from 'cors'

import { environment } from '../common/environment'
import { Router } from '../router/router'
import { mergePatchBodyParser } from './merge-patch.parser'
import { handleError } from './error.handler'
import { setAprazamento } from '../controller/consumo.controller'

export class Server {

  app: restify.Server

  initServer(routers: Router[] = []): Promise<Server>{
    return this.initDb().then(()=>
           this.initRoutes(routers).then(()=> this))
}

  initDb(): mongoose.MongooseThenable {
    (<any>mongoose).Promise = global.Promise
    return mongoose.connect(environment.db.url, {
      useMongoClient: true
    })
  }

  initRoutes(routers: Router[]): Promise<any>{
    return new Promise((resolve, reject)=>{
      try{

        this.app = restify.createServer({
          name: 'salus-vitae-api',
          version: '1.0.0'
        })

        this.app.use(restify.plugins.queryParser())
        this.app.use(restify.plugins.bodyParser())
        this.app.use(mergePatchBodyParser)
        this.app.use(cors())

        //routes
        for (let router of routers) {
          router.applyRoutes(this.app)
        }

        this.app.listen(environment.server.port, ()=>{
           resolve(this.app)
        })

        this.app.on('restifyError', handleError)

        //Exemplo do aprazamento de 4 medicações agendadas a cada 10 segundos (Iniciando e abortando a rotina) 
        var count = 0;
        setAprazamento(function (timeout) {
                 count++;
                 console.log(`Eu como enfermeira digo: -Hora de tomar o remedinho -- ${count} vez(es)`)
                 if (count == 4) {
                   console.log('Todos os remédios foram todamos. Rotina Cancelada.')
                   clearTimeout(timeout);
                 }
             },
             (( 0*60 +  3)*60 + 30)*1000,
             (( 0*60 + 0.10)*60 +  0)*1000,
             (( 0*60 +  0)*60 + 30)*1000);

      }catch(error){
        reject(error)
      }
    })
  }
}
