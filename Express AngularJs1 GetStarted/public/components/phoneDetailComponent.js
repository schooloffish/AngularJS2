angular.module('testApp').component('phoneDetail', {
    templateUrl: 'components/phoneDetailComponent.html',
    controller: phoneDetailController
});

function phoneDetailController($routeParams, $location) {
    var ctrl = this;
    var phoneId = $routeParams.phoneId;
    ctrl.phone = { id: phoneId };

    ctrl.goBack = function () {
        $location.path('/phones');
    }
}