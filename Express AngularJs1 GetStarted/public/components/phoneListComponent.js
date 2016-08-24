angular.module('testApp').component('phoneList', {
    templateUrl: 'components/phoneListComponent.html',
    controller: phoneListController
});

phoneListController.$inject = ['phoneService'];

function phoneListController(phoneService) {
    var ctrl = this;    
    phoneService.getPhones().then(function (phones) {
        ctrl.phones = phones;// [{ name: 'iPhone 5', price: 2000, id: 1 }, { name: 'iPhone 4', price: 800, id: 2 }];
    });
}