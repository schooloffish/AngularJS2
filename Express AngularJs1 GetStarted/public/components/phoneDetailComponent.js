angular.module('testApp').component('phoneDetail', {
    templateUrl: 'components/phoneDetailComponent.html',
    controller: phoneDetailController
});

phoneDetailController.$inject = ['$routeParams', '$location', 'phoneService']

function phoneDetailController($routeParams, $location, phoneService) {
    var ctrl = this;
    var phoneId = $routeParams.phoneId;
    ctrl.phone = { id: phoneId };

    phoneService.getPhoneById(phoneId).then(function (phoneData) {
        ctrl.phone = phoneData;
    })

    ctrl.goBack = function () {
        $location.path('/phones');
    }
}