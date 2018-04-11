import { template } from './template'
import { TodoController } from './controller'

angular.
module('app').
component('todoList', {
  template,
  controller: TodoController,
});