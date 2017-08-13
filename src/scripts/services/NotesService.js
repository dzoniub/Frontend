'use strict';

notesModule.service('NotesService', function ($http, $fileUploader) {
    var self = this;
    var notes = [];

    self.getUploader = function (scope) {
        return $fileUploader.create({
            scope: scope,
            method: "POST",
            url: config.hostName+"createNewImage"
        });
    };

    self.getAllNotes = function () {
        $http.get(config.hostName+'getAll').then(function (response) {
            notes.length = 0;
            for (var i = 0; i < response.data.length; i++) {
                notes.push(response.data[i]);
            }
        });
        return notes;
    };

    self.getNoteById = function (id) {
        for (var i = 0; i < notes.length; ++i) {
            if (notes[i].id != id) {
                continue;
            }

            return notes[i];
        }

        return null;
    };
});