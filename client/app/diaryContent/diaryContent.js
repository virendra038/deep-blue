'use strict';

angular.module('deep-blue')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('diaryContent', {
                title: 'User content @deepblue.com',
                url: '/memory',
                templateUrl: 'app/diaryContent/diaryContent.html',
                controller: 'diaryContentCtrl',
                controllerAs: 'ctrl',
                isAuthenticated: true

            })
    }]);