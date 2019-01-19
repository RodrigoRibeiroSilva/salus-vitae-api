import * as jestCli from 'jest-cli'

import { Server } from './server/server'
import { environment } from './common/environment'
import { alertaConsumoRouter } from './router/alerta-consumo-router'
import { AlertaConsumo } from './model/model-alerta-consumo'

let server: Server

const beforeAllTests = () => {
    environment.db.url = process.env.DB_URL || 'mongodb://dbatest1:dbatest1@ds161134.mlab.com:61134/salus-vitae-test'
    environment.server.port = process.env.SERVER_PORT || 3001

    server = new Server()

    return server.initServer([alertaConsumoRouter])
                 //Limpando a base de testes a cada execução
                 .then(() => AlertaConsumo.remove({}).exec())
                 
}

beforeAllTests()
    .then(() => jestCli.run())
    .then(() => afterAllTests())
    .catch(console.error)


const afterAllTests = () => {
    return server.disconnectServer()
}

