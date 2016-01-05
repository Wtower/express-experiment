var expressApp = angular.module('expressApp', []);

/**
 * Submits an angular form with ajax
 * Maintains states submitting, submitted
 * Broadcasts submit for other controllers to get notified
 * http://stackoverflow.com/questions/19515017/notify-of-changes-between-controllers-that-may-or-may-not-exist
 * http://fdietz.github.io/recipes-with-angular-js/controllers/sharing-code-between-controllers-using-services.html
 * @todo csrf
 */
expressApp.controller('FormCtrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
  $scope.states = {
    normal: 0,
    submitting: 1,
    submitted: 2
  };
  $scope.state = $scope.states.normal;
  $scope.submit = function(url, form) {
    $scope.state = $scope.states.submitting;
    $http.post(url, form)
      .then(function() {  // success
        $scope.state = $scope.states.submitted;
        $rootScope.$broadcast('submitted');
      }, function(res) {  // fail
        console.log(res);
      });
  };
}]);

/**
 * Fetches data with ajax
 * Refreshes every 10 seconds
 * http://stackoverflow.com/questions/18416458/angularjs-ngcontroller-to-be-reloading-data-periodically
 * Listens to broadcasted event to update
 *
 * Use `ng-init="fetch(url)"` fro initial fetch
 */
expressApp.controller('ListCtrl', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
  $scope.fetch = function(url) {
    if (url && !$scope.url) $scope.url = url;
    if (!$scope.url) return;
    $http.get($scope.url)
      .then(function(res) {
        $scope.rows = res.data;
      }, function(res) {
        console.log(res);
      });
  };
  $scope.intervalFunction = function(){
    $timeout(function() {
      $scope.fetch();
      $scope.intervalFunction();
    }, 10000)
  };
  $scope.intervalFunction();
  $scope.$on('submitted', $scope.fetch)
}]);
