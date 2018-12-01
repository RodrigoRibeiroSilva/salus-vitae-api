import { GenericRouter } from './generic-router'
import * as restify from 'restify'
import { User } from '../model/model-usuario'


class UsersRouter extends GenericRouter<User> {

  constructor(){
    super(User)
    this.on('beforeRender', document=>{
      document.password = undefined
    })
  }

  applyRoutes(app: restify.Server){
    app.get({path: `${this.basePath}`, version: '2.0.0'}, [this.findByEmail,this.findAll])
    app.get({path:`${this.basePath}`, version: '1.0.0'}, this.findAll)
    app.get(`${this.basePath}/:id`, [this.validateId, this.findById])
    app.post(`${this.basePath}`, this.save)
    app.put(`${this.basePath}/:id`, [this.validateId, this.replace])
    app.patch(`${this.basePath}/:id`, [this.validateId, this.update])
    app.del(`${this.basePath}/:id`, [this.validateId, this.delete])
  }

  findByEmail = (req, res, next) => {
    if(req.query.email){
        User.findByEmail(req.query.email)
            .then(user => {
                if(user){
                  return [user]
                }else{
                  return []
                }
            })
            .then(this.renderAll(res, next))
            .catch(next)
    }else{
      next()
    }
  }
}



export const usersRouter = new UsersRouter()
