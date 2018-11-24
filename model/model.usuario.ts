import * as mongoose from 'mongoose'
import { validateCPF } from '../common/validators/validateCpf'
import * as bcrypt from 'bcrypt' 
import { environment } from '../common/environment'

export interface User extends mongoose.Document {
  name: string,
  email: string,
  password: string
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required:  true
  },

  email: {
    type: String,
    unique: true,
    required:  true,
    match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  },

  password: {
    type: String,
    select: false,
    required:  true
  },

  cpf: {
    type: String,
    required: false,
    validate: {
      validator: validateCPF,
      message: '{PATH}: Invalid Cpf ({VALUE})'
    }
  }
})

//Middleware para Encriptar a senha em eventos de save
const saveMiddleware = function(next) {
  const user: User = this
  if(!user.isModified('password')){
    next()
  }else{
    hashPassword(user, next)
  }
}

//Middleware para Encriptar a senha em eventos de update
const updateMiddleware = function(next){
 
  if(!this.getUpdate().password){
    next()
  }else{
    hashPassword(this.getUpdate(), next)
  }
}

const hashPassword = (obj , next) => {
  bcrypt
    .hash(obj.password, environment.security.saltRounds)
    .then(hash => {
      obj.password = hash
      next()
    }).catch(next)
  }

  userSchema.pre('save', saveMiddleware)
  userSchema.pre('findOneAndUpdate', updateMiddleware)
  userSchema.pre('update', updateMiddleware)

 export const User = mongoose.model<User>('User', userSchema)
