'use strict';

notesModule.controller('TrashController', ['$scope', 'NotesService', '$stateParams', '$http', function ($scope, NotesService, $stateParams, $http) {
    $scope.notes = NotesService.getAllNotes();

    // for deleting a single trashed note
    $scope.deleteone = function (id) {
        $http.delete(config.hostName + id + '/delete').then(function (response) {
            if (response.data.uspesno === true) {
                $scope.notes = NotesService.getAllNotes();
            }
            else {
                alert('Error during deleting the note!');
            }
        });
    };

    // for deleting all trashed notes
    $scope.deleteall = function () {
        $http.delete(config.hostName + 'deleteAll').then(function (response) {
            if (response.data.uspesno === true) {
                $scope.notes = NotesService.getAllNotes();
            }
            else {
                alert('Error during deleting all notes!');
            }
        });
    };

    // for moving note in trash
    $scope.remove = function (id) {
        $http.post(config.hostName+ id + '/remove').then(function (response) {
            if (response.data.uspesno === true) {
                $scope.notes = NotesService.getAllNotes();
            }
            else {
                alert('Error during moving note to trash!');
            }
        });
    };
}]);