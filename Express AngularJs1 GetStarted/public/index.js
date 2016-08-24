angular.module('testApp', ['ngRoute']);

angular.module('testApp').config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $routeProvider.when('/phones', {
        template: '<phone-list></phone-list>'
    }).when('/phones/:phoneId', {
        template: '<phone-detail></phone-detail>'
    })
    $locationProvider
}]);

angular.module('testApp').run(['$location', function ($location) {
    $location.path('/phones');
}]);