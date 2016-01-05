var expressApp = angular.module('expressApp', []);

expressApp.controller('FormCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.submitting = false;
  $scope.submitted = false;
  $scope.submit = function(url, form) {
    $scope.submitting = true;
    $http.post(url, form)
      .then(function() {  // success
        $scope.submitting = false;
        $scope.submitted = true;
      }, function(res) {  // fail
        console.log(res);
      });
  };
}]);

expressApp.controller('ListCtrl', ['$scope', '$http', function($scope, $http) {
  console.log('test');
  console.log($scope.url);
  $http.get($scope.url)
    .then(function(res) {
      $scope.rows = res;
    }, function(res) {
      console.log(res);
    });
}]);
