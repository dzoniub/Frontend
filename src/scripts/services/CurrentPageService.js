'use strict';

notesModule.service('CurrentPageService', ['$rootScope', function ($rootScope) {
    var self= this;
    var currPage = 'allNotesPage';

    self.setCurrPage = function(param){
        if(currPage !== param){
            currPage = param;
            $rootScope.$broadcast('page:changed');
        }
    };

    self.getCurrPage = function(){
        return currPage;
    };

}]);