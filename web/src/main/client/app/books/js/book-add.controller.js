angular.module('app.books').controller('BookAddController', function ($scope, $window, $location, bookAddService, Flash, $modal) {
    'use strict';

    $scope.books = [];
    $scope.gridOptions = { data: 'books' };
    $scope.book ={id: null, title: '', authors: []};
    
    $scope.saveBook = function () {	
    	bookAddService.saveBook($scope.book).then(function (response) {
            $scope.books.push(response.data);
        });
    };
    
    $scope.addAuthor = function () {
        $modal.open({
            templateUrl: 'books/html/add-author-modal.html',
            controller: 'AuthorAddModalController',
            size: 'sm',
        }).result.then(function(response){
        	$scope.book.authors.push(response);
        });
    };
    
});