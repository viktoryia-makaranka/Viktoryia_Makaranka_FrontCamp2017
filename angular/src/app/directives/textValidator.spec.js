import app from '../app';

describe('directives', function() {
  let $scope
  let form

  beforeEach(() => {
    angular.mock.module(app);

    angular.mock.inject(($compile, $rootScope) => {
      $scope = $rootScope;
      const element = angular.element(
        `<form name="form">
            <input ng-model="model.text" name="text" required validator />
        </form>`
      );
      $scope.model = { text: '' }
      $compile(element)($scope);
      form = $scope.form;
    });
  });
  describe('validator', () => {
    it('should have >= 20 letters', () => {
      form.text.$setViewValue('12345678910111213141');
      $scope.$digest();
      expect($scope.model.text).toEqual('12345678910111213141');
      expect(form.text.$valid).toBe(true);
    });

    it('should not have less than 20 letters', () => {
      form.text.$setViewValue('abc');
      $scope.$digest();
      expect($scope.model.text).toBeUndefined();
      expect(form.text.$valid).toBe(false);
    });
  });
});