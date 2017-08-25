'use strict';

notesModule.directive('noteCard', ['NotesService', function(NotesService){
   return {
       restrict: 'E',
       scope: {
           note: '='
       },
       templateUrl: 'view/single-note-card.html',
       controller: function($scope) {
           $scope.editMode = false;
           $scope.colorChange = false;

           $scope.editModeToggle = function(){
               $scope.editMode = !$scope.editMode;
           };

           $scope.colorChangeToggle = function(){
               $scope.colorChange = !$scope.colorChange;
           };

           $scope.remove = function(id) {
               NotesService.remove(id);
           };
           $scope.editColor = function(id, color) {
               NotesService.editColor(id,color);
           };
           $scope.deleteOne = function(id) {
                NotesService.deleteOne(id);
           };
           $scope.submitEdit = function(id, title, content) {
               var note = NotesService.getNoteById(id);
               var parameter = '';
               if(note.type === 'note'){
                   parameter = ( {type:note.type, title:title, content:content} );
               }
               else if(note.type === 'link'){
                   parameter = ({type:note.type, content:content});
               }
               NotesService.submitEdit(id, parameter);
           }
       }
   };
}]);