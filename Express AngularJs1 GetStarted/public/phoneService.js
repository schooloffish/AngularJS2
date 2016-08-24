angular.module('testApp').factory('phoneService', phoneService);
phoneService.$inject = ['$q', '$http'];
function phoneService($q, $http) {
    function getPhones() {
        return $q(function (resolve, reject) {
            $http.get('api/v1/phones').then(function successCallback(response) {
                resolve(response.data);
            }, function errorCallback(response) {
                reject();
                console.log('Failed to get phones');
            });
        });
    }
    return {
        getPhones: getPhones
    }
}