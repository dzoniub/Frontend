'use strict';

notesModule.controller('ModalController', ['$scope', 'NotesService', '$stateParams', 'CurrentPageService', function ($scope, NotesService, $stateParams, CurrentPageService) {
    $scope.currentPage = CurrentPageService.getCurrPage();
    $scope.noteTitle = '';
    $scope.noteContent = '';
    $scope.imageURL = '';
    $scope.linkURL = '';
    $scope.noteType= '';

    $scope.$on('page:changed', function(event){
        $scope.currentPage = CurrentPageService.getCurrPage();
        // angular.element(document.querySelectorAll(".nav-tabs > li")).removeClass("active");
        // angular.element(document.querySelectorAll(".tab-content > .tab-pane")).removeClass("active");
        $scope.setNoteType();
    });

    $scope.$on('note:updated', function(event){
        $scope.resetScope();
        angular.element(document.querySelector('.modal')).modal('hide');
    });

    $scope.setNoteType = function(){
        switch($scope.currentPage){
            case 'allNotesPage':
                $scope.noteType= 'note';
                // angular.element(document.querySelector("#noteTab")).addClass("active");
                // angular.element(document.querySelector("#addNote")).addClass("active");
                break;
            case 'notesPage':
                $scope.noteType='note';
                // angular.element(document.querySelector("#noteTab")).addClass("active");
                // angular.element(document.querySelector("#addNote")).addClass("active");
                break;
            case 'imagesPage':
                $scope.noteType='image';
                // angular.element(document.querySelector("#imageTab")).addClass("active");
                // angular.element(document.querySelector("#addImage")).addClass("active");
                break;
            case 'linksPage':
                $scope.noteType='link';
                // angular.element(document.querySelector("#linkTab")).addClass("active");
                // angular.element(document.querySelector("#addLink")).addClass("active");
                break;
            default :
                break;
        }
    };

    $scope.setNoteType();

    $scope.filesChanged = function(element) {
        $scope.files = element.files;
        $scope.$apply();
    };

    $scope.resetScope = function(){
        $scope.noteTitle = '';
        $scope.noteContent = '';
        $scope.imageURL = '';
        $scope.linkURL = '';
        document.getElementById('fileInputField').value  = "";
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
        NotesService.submit(parameter);
    };

    // for posting a new image note
    $scope.submitImage = function () {
        var fd = new FormData();
        angular.forEach($scope.files, function (file) {
            fd.append('file', file);
        });
        NotesService.submitImage(fd);
    };
}]);