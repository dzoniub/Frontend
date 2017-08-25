'use strict';

notesModule.controller('NavbarController', ['$scope', '$stateParams', 'CurrentPageService', function ($scope, $stateParams, CurrentPageService) {
    $scope.currentPage = CurrentPageService.getCurrPage();

    $scope.setCurrent = function(param) {
        CurrentPageService.setCurrPage(param);
    };

    $scope.$on('page:changed', function(event){
        $scope.currentPage = CurrentPageService.getCurrPage();
    });
}]);