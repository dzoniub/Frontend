'use strict';

notesModule.controller('NotesController', ['$scope', 'NotesService', '$stateParams', '$http', function ($scope, NotesService, $stateParams, $http) {
    $scope.notes = NotesService.getAllNotes();
    $scope.noteType = '';
    $scope.noteTitle = '';
    $scope.noteContent = '';
    $scope.imageURL = '';
    $scope.linkURL = '';

    $scope.uploader = NotesService.getUploader($scope);

    $scope.uploader.bind("completeall", function (event, items) {
        $scope.done_uploading = true;
    });

    $scope.resetScope = function(){
        $scope.noteTitle = '';
        $scope.noteContent = '';
        $scope.imageURL = '';
        $scope.linkURL = '';
    };

    // for editing color of the note
    $scope.editColor = function(id, color){
        $http.post(config.hostName+id+'/edit/'+encodeURIComponent(color)).then(function (response) {
            if(response.data.uspesno === true){
                $scope.notes = NotesService.getAllNotes();
            }
            else{
                alert('Error during changing color!');
            }
        });

    };

    // for moving note in trash
    $scope.remove = function(id){
        $http.post(config.hostName+id+'/remove').then(function (response) {
            if(response.data.uspesno === true){
                $scope.notes = NotesService.getAllNotes();
            }
            else{
                alert('Error during delete!');
            }
        });
    };

    // for posting a new note
    $scope.submit = function () {
        var parameter = '';
        if($scope.noteType === 'note'){
            parameter = ({type:$scope.noteType, title:$scope.noteTitle, content:$scope.noteContent});
        }
        else if($scope.noteType === 'link'){
            parameter = ({type:$scope.noteType, content:$scope.linkURL});
        }
        $http.post(config.hostName+'createNew', parameter).then(function (response) {
            if(response.data.uspesno === true){
                alert('Note successfully added!');
                $scope.notes = NotesService.getAllNotes();
                angular.element(document.querySelector('.modal')).modal('hide');
                $scope.resetScope();
            }
            else{
                alert('Error during adding note!');
            }
        });
    };

    // for editing a note
    $scope.submitEdit = function(id, title, content) {
        var note = NotesService.getNoteById(id);
        var parameter = '';
        if(note.type === 'note'){
            parameter = ( {type:note.type, title:title, content:content} );
        }
        else if(note.type === 'link'){
            parameter = ({type:note.type, content:content});
        }
        $http.post(config.hostName+id+'/edit', parameter).then(function (response) {
            if(response.data.uspesno === true){
                alert('Note successfully edited!');
                $scope.notes = NotesService.getAllNotes();
                angular.element(document.querySelector('.modal')).modal('hide');
                $scope.resetScope();
            }
            else{
                alert('Error during editing!');
            }
        });
    };

    $scope.successImageReload = function() {
        $scope.notes = NotesService.getAllNotes();
    }

}]);
