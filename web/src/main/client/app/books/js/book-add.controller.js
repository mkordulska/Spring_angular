angular.module('app.books').controller('BookAddController', function ($scope, $window, $location, bookAddService, Flash, $modal) {
    'use strict';

    $scope.books = [];
    $scope.gridOptions = { data: 'books' };
    $scope.book ={title: undefined, authors: []};
    $scope.authors=[];
    
    $scope.saveBook = function () {	
    	bookAddService.saveBook($scope.book).then(function () {
            Flash.create('success', 'Książka została dodana.', 'custom-class');
        });
    };
    
    $scope.addAuthor = function () {
        $modal.open({
            templateUrl: 'books/html/add-author-modal.html',
            controller: 'AuthorAddModalController',
            size: 'sm',
        }).result.then(function(response){
        	  $scope.book.authors.push(response);
        	$scope.authors.push(response);
        });
    };
    
});