'use strict';

notesModule.controller('NotesController', ['$scope', 'NotesService', '$stateParams', 'CurrentPageService', function ($scope, NotesService, $stateParams, CurrentPageService) {
    $scope.notes = NotesService.getAllNotes();
    $scope.currentPage = CurrentPageService.getCurrPage();

    $scope.$on('page:changed', function(event){
        $scope.currentPage = CurrentPageService.getCurrPage();
    });

    $scope.$on('note:updated', function(event){
        $scope.notes = NotesService.getNotes();
    });

    $scope.currentPageNoteFilter = function(){
      switch($scope.currentPage){
          case 'allNotesPage':
              return '';
              break;
          case 'notesPage':
              return 'note';
              break;
          case 'imagesPage':
              return 'image';
              break;
          case 'linksPage':
              return 'link';
              break;
      }
    };
}]);