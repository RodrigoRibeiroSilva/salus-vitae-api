"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const render_1 = require("./render");
const mongoose = require("mongoose");
const restify_errors_1 = require("restify-errors");
class GenericRouter extends render_1.Router {
    constructor(model) {
        super();
        this.model = model;
        this.validateId = (req, res, next) => {
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                next(new restify_errors_1.NotFoundError('Documento não encontrado'));
            }
            else {
                next();
            }
        };
        this.findAll = (req, res, next) => {
            this.prepareAll(this.model.find())
                .then(this.renderAll(res, next))
                .catch(next);
        };
        this.findById = (req, res, next) => {
            this.prepareOne(this.model.findById(req.params.id))
                .then(this.render(res, next))
                .catch(next);
        };
        this.save = (req, res, next) => {
            let document = new this.model(req.body);
            document.save()
                .then(this.render(res, next))
                .catch(next);
        };
        this.update = (req, res, next) => {
            const options = { runValidators: true, new: true };
            this.model.findByIdAndUpdate(req.params.id, req.body, options)
                .then(this.render(res, next))
                .catch(next);
        };
        this.replace = (req, res, next) => {
            const options = { runValidators: true, overwrite: true };
            this.model.update({ _id: req.params.id }, req.body, options)
                .exec().then(result => {
                if (result.n) {
                    return this.model.findById(req.params.id);
                }
                else {
                    throw new restify_errors_1.NotFoundError('Documento não encontrado');
                }
            }).then(this.render(res, next))
                .catch(next);
        };
        this.delete = (req, res, next) => {
            this.model.remove({ _id: req.params.id }).exec().then((cmdResult) => {
                if (cmdResult.result.n) {
                    res.send(204);
                }
                else {
                    throw new restify_errors_1.NotFoundError('Documento não encontrado');
                }
                return next();
            }).catch(next);
        };
    }
    prepareOne(query) {
        return query;
    }
    prepareAll(query) {
        return query;
    }
}
exports.GenericRouter = GenericRouter;
