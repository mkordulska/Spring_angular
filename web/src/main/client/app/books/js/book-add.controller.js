angular.module('app.books').controller('BookAddController', function ($scope, $window, $location, bookAddService, Flash, $modal) {
    'use strict';

    $scope.books = [];
    $scope.gridOptions = { data: 'books' };
    $scope.book ={id: null, title: '', authors: []};
    $scope.authors=[];
    
    $scope.saveBook = function (book) {	
    	bookAddService.saveBook(book);
    	$scope.books.push(book);
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