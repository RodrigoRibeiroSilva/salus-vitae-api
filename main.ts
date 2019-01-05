import { Server } from './server/server'

import { alertaConsumoRouter } from './router/alerta-consumo-router';
import { opConsumoRodelagemRouter } from './router/op-consumo-rodelagem-router';
import { preOperacaoAprazamentoRouter } from './router/preop-aprazamento-router';

export const server = new Server()

server.initServer([
                  alertaConsumoRouter,
                  opConsumoRodelagemRouter,
                  preOperacaoAprazamentoRouter])
  .then(server => {
        console.log('Server is listening on:', server.app.address())
}).catch(error => {
        console.log('Server failed to start')
        console.error(error)
        process.exit(1)
})