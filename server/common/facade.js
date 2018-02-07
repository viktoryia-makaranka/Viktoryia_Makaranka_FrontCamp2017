export default class Facade {
  constructor(Schema) {
    this.Schema = Schema;
  }

  find(...args) {
    return this.Schema
      .find(...args)
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
