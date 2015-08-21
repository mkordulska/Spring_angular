angular.module('app.authors').controller('AuthorSearchController', function ($scope, $window, $location, authorService, Flash) {
    'use strict';

    $scope.authors = [];
    $scope.gridOptions = { data: 'authors' };
    $scope.author = {firstName: undefined, lastName: undefined};

    $scope.search = function () {
        authorService.search().then(function (response) {
            angular.copy(response.data, $scope.authors);
        }, function () {
            Flash.create('danger', 'Wyjątek', 'custom-class');
        });
    };
    
//    $scope.myCustomSearchAuthor = function(author, searchAuthor){
//    	if(!! searchAuthor){
//    	return author.firstName.substring(0,searchAuthor.length).match(searchAuthor);}
//    };

});
