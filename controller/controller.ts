import * as mongoose from 'mongoose'
import { NotFoundError } from 'restify-errors'

import { Render } from '../view/render'

export abstract class Controller<E extends mongoose.Document> extends Render{

    basePath: string
    pageSize: number = 10

    constructor(protected model: mongoose.Model<E>){
        super()
        this.basePath = `/${model.collection.name}`
    }


    validateId = (req, res, next) => {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            next(new NotFoundError('Document Not Found'))
        }else{
            next()
        }
    } 

    findAll = (req, res, next) => {
        //Paginação da resposta
        let page = parseInt(req.query._page || 1)
        page = page > 0 ? page : 1

        const skip = (page -1) * this.pageSize

        this.model.count({})
                  .exec()
                  .then(count => this.prepareAll(this.model.find())
                        .skip(skip)
                        .limit(this.pageSize)
                        .then(this.renderAll(res, next, {page, count, pageSize: this.pageSize, url: req.url})))
                  .catch(next)
      }

    findById = (req, res, next) => {
        this.prepareOne(this.model.findById(req.params.id))
            .then(this.render(res, next))
            .catch(next)
    }

    save = (req, res, next) => {
        let document = new this.model(req.body)
        document.save()
            .then(this.render(res, next))
            .catch(next)
    }

    update = (req, res, next) => {
        const options = { runValidators: true, new : true }
        this.model.findByIdAndUpdate(req.params.id, req.body, options)
            .then(this.render(res, next))
            .catch(next)
      }

    replace = (req, res, next) => {
        const options = { runValidators: true, overwrite: true }
        this.model.update({_id: req.params.id}, req.body, options)
            .exec().then((result) => {
          if(result.n){
            return this.model.findById(req.params.id)
          } else{
            throw new NotFoundError('Document Not Found')
          }
        }).then(this.render(res, next))
          .catch(next)
    } 

     delete =  (req, res, next) => {
        this.model.remove({_id:req.params.id}).exec().then((cmdResult: any)=>{
          if(cmdResult.result.n){
            res.send(204)
          }else{
            throw new NotFoundError('Document Not Found')
          }
          return next()
        }).catch(next)
      }

    protected prepareOne(query: mongoose.DocumentQuery<E,E>): mongoose.DocumentQuery<E,E>{
        return query
    }

    protected prepareAll(query: mongoose.DocumentQuery<E[],E>): mongoose.DocumentQuery<E[],E>{
        return query
    }
    
    envelope(document: any) : any {
        let resource = Object.assign({_links:{}}, document.toJSON())
        resource._links.self = `${this.basePath}/${resource._id}`
        return resource
    }

    envelopeAll(documents: any[], options) : any {
        const resource: any  ={
            _links: {
                self: `${options.url}`
            },
            items: documents
    }
        //Lógica para exibição dos metadados das páginas seguintes e anteriores
        if(options.page && options.count && options.pageSize){
            if(options.page > 1){
                resource._links.previous = `${this.basePath}?_page=${options.page-1}`
            }
            const remaining = options.count - (options.page * options.pageSize)
            if(remaining > 0){
                resource._links.next = `${this.basePath}?_page=${options.page+1}`
            }
        }
        return resource
    }  
}