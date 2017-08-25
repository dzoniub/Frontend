'use strict';

notesModule.service('NotesService',['$http', '$rootScope', function ($http, $rootScope) {
    var self = this;
    var notes = [];

    // for getting all notes from api
    self.getAllNotes = function () {
        $http.get(config.hostName+'getAll').then(function (response) {
            notes.length = 0;
            for (var i = 0; i < response.data.length; i++) {
                notes.push(response.data[i]);
            }
        });
        return notes;
    };

    // for returning notes array
    self.getNotes = function() {
      return notes;
    };

    // for finding a note by it's id
    self.getNoteById = function (id) {
        for (var i = 0; i < notes.length; ++i) {
            if (notes[i].id != id) {
                continue;
            }

            return notes[i];
        }

        return null;
    };

    // for posting a new note
    self.submit = function (parameter) {
        $http.post(config.hostName+'createNew', parameter).then(function (response) {
            if(response.data.uspesno === true){
                self.getAllNotes();
                $rootScope.$broadcast('note:updated');
            }
            else{
                alert('Error during adding note!');
            }
        });
    };

    // for posting a new image note
    self.submitImage = function (fd) {
        $http.post(config.hostName+'createNewImage', fd,
            {
                transformRequest:angular.identity,
                headers:{'Content-Type':undefined}
            }).then(function (response) {
            if(response.data.uspesno === true){
                self.getAllNotes();
                $rootScope.$broadcast('note:updated');
            }
            else{
                alert('Error during adding note!');
            }
        });
    };

    // for editing a note
    self.submitEdit = function(id, parameter) {
        $http.post(config.hostName+id+'/edit', parameter).then(function (response) {
            if(response.data.uspesno === true){
                self.getAllNotes();
                $rootScope.$broadcast('note:updated');
            }
            else{
                alert('Error during editing!');
            }
        });
    };

    // for moving note in trash and returning from the trash (works like toggle)
    self.remove = function(id){
        $http.post(config.hostName+id+'/remove').then(function (response) {
            if(response.data.uspesno === true){
                self.getAllNotes();
                $rootScope.$broadcast('note:updated');
            }
            else{
                alert('Error during delete!');
            }
        });
    };

    // for editing color of the note
    self.editColor = function(id, color){
        $http.post(config.hostName+id+'/edit/'+encodeURIComponent(color)).then(function (response) {
            if(response.data.uspesno === true){
                self.getAllNotes();
                $rootScope.$broadcast('note:updated');
            }
            else{
                alert('Error during changing color!');
            }
        });
    };

    // for deleting a single note
    self.deleteOne = function (id) {
        $http.delete(config.hostName + id + '/delete').then(function (response) {
            if (response.data.uspesno === true) {
                self.getAllNotes();
                $rootScope.$broadcast('note:deleted');
            }
            else {
                alert('Error during deleting the note!');
            }
        });
    };

    // for deleting all trashed notes
    self.deleteAll = function () {
        $http.delete(config.hostName + 'deleteAll').then(function (response) {
            if (response.data.uspesno === true) {
                self.getAllNotes();
                $rootScope.$broadcast('note:deleted');
            }
            else {
                alert('Error during deleting all notes!');
            }
        });
    };
}]);