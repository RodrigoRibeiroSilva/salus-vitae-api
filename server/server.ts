import * as restify from 'restify'
import * as mongoose from 'mongoose'
import * as admin from 'firebase-admin';
import * as corsMiddleware from 'restify-cors-middleware'
import * as fs from 'fs'

import { environment } from '../common/environment'
import { mergePatchBodyParser } from './merge-patch.parser'
import { handleError } from './error.handler'
import { tokenParser } from '../security/token.parser'
import { logger } from '../common/logger'
import { throws } from 'assert';



export class Server {
  
  app: restify.Server
  aprazamentos
  adm

  disconnectServer(){
    return mongoose.disconnect().then( () => this.app.close())
  }

  initServer(routers: any[]): Promise<Server>{
    this.aprazamentos = new Map()
      return this.initDb()
                 .then(() => this.initRoutes(routers)
                 .then(() => this.initFCM())
                 .then(() => this))
  }

  initDb(): mongoose.MongooseThenable {
    (<any>mongoose).Promise = global.Promise
    return mongoose.connect(environment.db.url, {
      useMongoClient: true
    })
  }

  initFCM(){
    this.adm = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: 'push-notification-salus-vitae',
        clientEmail: 'firebase-adminsdk-czu6v@push-notification-salus-vitae.iam.gserviceaccount.com',
        privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCs58gCHUJKJMRx\nweCHdx4Cd7pZx/oH0xPnF04dADeF/CL0asrJ+IP9Dm268l4GRwQTjKGEy22hOJdQ\nk9nTWrZh0KFgGprrkytX2pUvtOOvDnzW2grDTWebdtF4q+2OFJRlglyOfRB12tdH\n9WfDxldD6wACNOsoPzAByfzgsQAGXqkjUZaE4Grf3wbnYh8XYM3qNwR1ki1tXDy6\n6gMJyBKImbC5UHbkZr6SI/hPTyl4iQbLJY8dDQ8PnIJUDArDeBDZ5uRK8EouTxIL\ncHv+UaFBFl7nBc/8VLW2D8wRUp6z8yKsJWBw899aQSKHYlwCYksPE5zXUntXI0RT\nzJTD1v1FAgMBAAECggEAAIlMaxozpDFBEAhKEYY1JwtCDJJ6w66lHdX3bNsTCDs3\nJtrqTJsAzeJ3U+dZKbn1gk6ubvMpw8ijz5gvENYC7qNPLZ6x3BG8I1H82Y55Y04j\n+T8lP7wDWUTlcdo2H36mq7KGH7zx3fWZ9vnuVhCBwegHGrHdHHA6/g69707hUoqh\n7RO0EAjT3zN4AlwZM3XS8bCGCyey69BarBykXmYvZsmJInD291Adlp+rMXOLPxo4\nbzCDrFvNUdAae8Hs6XP+UGOTxpN6L7NtkAkbkyAa5jaUB0MW3nq4Bcc/5t71LBKC\nRotPokhTHnq2rNPTEAucdLopNsjLBfLuoK9gCwTSMQKBgQDhd9LkbM2GGwnGXL0/\nastP63RdIBgLoMdNLee8SkyOZkcdFr1++9Rb3tfRKIwnLggbBDsSv/JKqxcMGPxb\n6QYD/FM3OfUehPiA/kMMjxgbwVylkF1Tv9MnB5ZrrQPd1zR3yUMIohKJtlwYOUl4\nWvQCvAL1MiNeYzqS1eW9nvha3QKBgQDEUcv0qXQdcG/fD7mJ92uV/dmxzP4HsgL1\nW/f6sUDgHIytkQp2EjMMZRfpcRJbMotIWgZTm66P789moJNziMVJKilzgy/EwMze\nvjsTKUESLdLtW1/VzvhpmM8w2uKh1dmNQAbGWZS9HTwYzB2+ch92VS1Y+11O6ODR\nlJDeuOmBiQKBgH8V1x1B5qaMXvocE9/HBkpJ4REMogEL4sqx8UjEaFprc/IFe1I0\nCAKwnN0cCcObwp3XyKRM5PkJbrg27SexNN7SPuWGGY/WS2wJ5SkTDve2Cc6YjMJE\nAXSiZjrTDrbgMobCPrKDCAfvbgGJaMwaGCfiaZhjZmQxcjaJsjErhblRAoGABwfS\n4Qksgl1jdD6Q63Lz5GQ55pcrxcTHPFg10kGEzEHZe+HE2SOftmLsb0zAVonB2S54\nKYhawQbai5dWkH2maw9aequJC2fILnXrka0ZingfpKZwES0fUlDJortEAH2zE87m\nLzZIEFm6rDyrGAXoQImeXSBrYAcQ/hBu+7rtidkCgYEAxqlDWQHA0d10mWIMz+Xb\nOzrQxQrxCKshnes6wABOMEkVERkN2aSA9euefFgspZOE9mJXA4SKderWJNo90oRz\nCkBK1p82woZmRKGfStEwUhN0RFiIALsgumnXgZYvT6muCZfYHXcDyFdtStKaTeCj\nRy8OODGTwqF4ZG8W0ckbftM=\n-----END PRIVATE KEY-----\n',
      }),
      databaseURL: 'https://push-notification-salus-vitae.firebaseio.com'
    });
  }

  initRoutes(routers: any[]): Promise<any>{
    return new Promise((resolve, reject)=>{
      try{

        const options: restify.ServerOptions = {
          name: 'salus-vitae-api',
          version: '1.0.0',
          log: logger
        }

        if(environment.security.enableHTTPS){
          options.certificate = fs.readFileSync(environment.security.certificate)
          options.key = fs.readFileSync(environment.security.key)
        }

        this.app = restify.createServer(options)

        const cors = corsMiddleware({origins: ['*']})

        this.app.use(restify.plugins.queryParser())
        this.app.use(restify.plugins.bodyParser())
        this.app.pre(restify.plugins.requestLogger({
          log: logger
        }))
        this.app.use(mergePatchBodyParser)
        this.app.use(tokenParser)
        this.app.pre(cors.preflight)
        this.app.use(cors.actual)

      
        //routes
        for (let router of routers) {
          router.applyRoutes(this.app)
        }

        this.app.listen(environment.server.port, () => {
           resolve(this.app)
        })

        this.app.on('restifyError', handleError)
        //(req, res, router, error)
       /* Exemplo de como implementar o auth log  
      this.app.on('after', restify.plugins.auditLogger({
          log: logger,
          event: 'after',
          body: true,
          server: this.app
        }))

        this.app.on('audit', data => {

        })
 */
      }catch(error){
        reject(error)
      }
    })
  }
}
