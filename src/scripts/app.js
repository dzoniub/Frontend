'use strict';

var notesModule = angular.module('trackNotes',  ['ui.router']);

notesModule.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/');

    $stateProvider.state(
        {
            name: 'beginingState',
            url: '/',
            templateUrl: 'view/startPage.html',
            controller: 'NotesController'
        }
    ).state(
        {
            name: 'trashedNotes',
            url: '/trash',
            templateUrl: 'view/trash.html',
            controller: 'TrashController'
        }
    );
}]);

