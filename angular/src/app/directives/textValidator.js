angular.
module('app').
directive('validator', () => ({
  require: 'ngModel',
  restrict: 'A',
  link: (scope, elm, attrs, ctrl) => {
    ctrl.$validators.validator = (modelValue, viewValue) => {
      if (ctrl.$isEmpty(modelValue)) {
        return true
      }

      return viewValue.length >= 20 && viewValue.length >= 20
    }
  }
}));