import * as restify from 'restify'

import { usuarioController } from '../controller/usuario-controller'
import { authenticate } from '../security/auth.handler'
import { authorize } from '../security/authz.handler'


class UsuarioRouter {

    applyRoutes(app: restify.Server){
      app.get('/users',       [authorize('admin') , usuarioController.findByEmail , usuarioController.findAll ])
      app.get('/users/:id',   [authorize('admin') , usuarioController.validateId, usuarioController.findById])
      app.post('/users',      [authorize('admin') , usuarioController.save])
      app.put('/users/:id',   [authorize('admin') , usuarioController.validateId, usuarioController.replace])
      app.patch('/users/:id', [authorize('admin') , usuarioController.validateId, usuarioController.update])
      app.del('/users/:id',   [authorize('admin') , usuarioController.validateId, usuarioController.delete])

      app.post('users/authenticate', authenticate)
    }
  }
  
  export const usuarioRouter = new UsuarioRouter()