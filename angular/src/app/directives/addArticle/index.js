import { template } from './template'

angular.
module('app').
directive('addArticle', () => ({
  template,
  restrict: 'E',
  scope: {
    article: '=',
    setArticle: '=',
    isNewArticle: '='
  }
}));