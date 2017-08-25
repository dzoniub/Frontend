'use strict';

notesModule.directive('activeTab', ['CurrentPageService', function(CurrentPageService){
    return {
        restrict: 'A',
        link: function(scope, elm, attrs) {
            scope.pages = scope.$eval(attrs.activeTab);
            if(scope.pages.indexOf(CurrentPageService.getCurrPage())!==-1) {
                elm.addClass("active");
            }
            else {
                elm.removeClass("active");
            }
            scope.$on('page:changed', function(event) {
                scope.pages = scope.$eval(attrs.activeTab);
                if(scope.pages.indexOf(CurrentPageService.getCurrPage())!==-1) {
                    elm.addClass("active");
                }
                else {
                    elm.removeClass("active");
                }
            });
        }
    };
}]);