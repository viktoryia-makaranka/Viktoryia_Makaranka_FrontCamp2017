import httpStatus from 'http-status';
import { Types } from 'mongoose';

export default class Controller {
  constructor(facade) {
    this.facade = facade;
  }

  async create(req, res, next) {
    try {
      res
        .status(httpStatus.CREATED)
        .json(await this.facade.create(req.body));
    } catch (err) {
      next(err);
    }
  }

  async find(req, res, next) {
    try {
      res
        .status(httpStatus.OK)
        .json(await this.facade.find(req.query.findQuery));
    } catch (err) {
      next(err);
    }
  }

  async findOne(req, res, next) {
    try {
      const data = await this.facade.findOne(req.query);
      if (!data) return res.sendStatus(httpStatus.NOT_FOUND);
      res.status(httpStatus.OK).json(data);
    } catch (err) {
      next(err);
    }
  }

  async findById(req, res, next) {
    try {
      const data = await this.facade.findById(req.params.id);
      if (!data) return res.sendStatus(httpStatus.NOT_FOUND);
      res.status(httpStatus.OK).json(data);
    } catch (err) {
      next(err);
    }
  }

  async insertMany(req, res, next) {
    try {
      const results = await this.facade.insertMany(req.body, { ordered: false });
      if (results.nInserted < 1) return res.sendStatus(httpStatus.NOT_MODIFIED);
      res.status(httpStatus.CREATED).json(results);
    } catch (err) {
      next(err);
    }
  }

  async findByIdAndUpdate(req, res, next) {
    try {
      const id = req.params.id;
      if (!Types.ObjectId.isValid(id)) return res.sendStatus(httpStatus.BAD_REQUEST);
      const results = await this.facade.findByIdAndUpdate(Types.ObjectId(id), req.body, { upsert: true, new: true });
      res.status(results.nUpserted >= 1 ? httpStatus.CREATED : httpStatus.OK).json(results);
    } catch (err) {
      next(err);
    }
  }

  async findByIdAndRemove(req, res, next) {
    try {
      const results = await this.facade.findByIdAndRemove(req.params.id);
      if (!results) return res.sendStatus(httpStatus.NOT_FOUND);
      res.status(httpStatus.OK).json(results);
    } catch (err) {
      next(err);
    }
  }
}