export default class Facade {
  constructor(Schema) {
    this.Schema = Schema;
  }

  create(body) {
    const schema = new this.Schema(body);
    return schema.save();
  }

  find(...args) {
    return this.Schema
      .find(...args)
      .exec();
  }

  findOne(...args) {
    return this.Schema
      .findOne(...args)
      .exec();
  }

  findById(...args) {
    return this.Schema
      .findById(...args)
      .exec();
  }

  insertMany(...args) {
    return this.Schema.insertMany(...args);
  }

  findByIdAndUpdate(...args) {
    return this.Schema
      .findByIdAndUpdate(...args)
      .exec();
  }

  findByIdAndRemove(...args) {
    return this.Schema
      .findByIdAndRemove(...args)
      .exec();
  }
}
