'use strict';

notesModule.controller('TrashController', ['$scope', 'NotesService', '$stateParams', function ($scope, NotesService, $stateParams) {
    $scope.notes = NotesService.getAllNotes();

    $scope.$on('note:deleted', function(event){
        $scope.notes = NotesService.getNotes();
    });

    // for deleting all trashed notes
    $scope.deleteAll = function () {
        NotesService.deleteAll()
    };

}]);