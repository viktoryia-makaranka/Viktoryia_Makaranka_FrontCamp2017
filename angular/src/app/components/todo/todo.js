import { template } from './todos-template'
import { controller } from './todo-controller'

angular.
module('app').
component('todoList', {
  template,
  controller,
});