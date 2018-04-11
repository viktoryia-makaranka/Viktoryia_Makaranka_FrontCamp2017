import { template } from './template'
import ArticlesController from './controller'

angular.
module('app').
component('articlesList', {
  template,
  controller: ArticlesController,
});