import { Controller } from './controller'
import { User } from '../model/model-usuario';

class UsuarioController extends Controller<User> {

    constructor(){
      super(User)
      this.on('beforeRender', document=>{
        document.password = undefined
        //delete document.password
      })
    }

    findByEmail = (req, resp, next) => {
      if(req.query.email){
        User.findByEmail(req.query.email)
            .then(user => user ? [user] : [])
            .then(this.renderAll(resp, next, {
                  pageSize: this.pageSize,
                  url: req.url
                }))
            .catch(next)
      }else{
        next()
      }
    }
}
  
export const usuarioController = new UsuarioController()