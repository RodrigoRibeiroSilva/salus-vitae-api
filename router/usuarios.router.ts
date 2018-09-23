import { GenericRouter } from './generic.router'
import * as restify from 'restify'
import { User } from '../model/model.usuario'


class UsersRouter extends GenericRouter<User> {

  constructor(){
    super(User)
    this.on('beforeRender', document=>{
      document.password = undefined
    })
  }

  applyRoutes(app: restify.Server){
    app.get('/users', this.findAll)
    app.get('/users/:id', [this.validateId, this.findById])
    app.post('/users', this.save)
    app.put('/users/:id', [this.validateId, this.replace])
    app.patch('/users/:id', [this.validateId, this.update])
    app.del('/users/:id', [this.validateId, this.delete])
  }
}

export const usersRouter = new UsersRouter()
