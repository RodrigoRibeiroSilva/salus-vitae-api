import * as mongoose from 'mongoose'



export interface User extends mongoose.Document {
  name: string,
  email: string,
  password: string,
  cpf: string,
  gender: string,
  profiles: string[],
  matches(password: string): boolean,
  hasAny(...profiles: string[]): boolean
}

export interface UserModel extends mongoose.Model<User> {
  findByEmail(email: string, projection?: string): Promise<User>
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 80,
    minlength: 3
  },
  email: {
    type: String,
    unique: true,
    match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    required: true
  },
  password: {
    type: String,
    select: false,
    required: true
  },
  gender: {
    type: String,
    required: false,
    enum: ['Male', 'Female']
  },
  profiles :{
    type: [String],
    required: false
  }
})

userSchema.statics.findByEmail = function(email: string, projection: string){
  return this.findOne({email}, projection) //{email: email}
}

userSchema.methods.matches = function(password: string): boolean {
  return password === this.password
}

userSchema.methods.hasAny = function(...profiles: string[]) : boolean {
  return profiles.some(profile => this.profiles.indexOf(profile)!== -1)
}

 export const User = mongoose.model<User, UserModel>('User', userSchema)
