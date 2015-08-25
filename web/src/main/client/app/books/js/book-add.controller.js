angular.module('app.books').controller('BookAddController', function ($scope, $window, $location, bookAddService, Flash, $modal) {
    'use strict';

    $scope.book ={title: '', authors: []};
    
    var removeAuthor = function (author) {
    	$scope.book.authors.splice($scope.book.authors.indexOf(author), 1);
    };
    
    $scope.saveBook = function () {	
    	bookAddService.saveBook($scope.book).then(function (response) {
            $scope.book = response.data;
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
    
    $scope.deleteAuthor = function (author) {
    	removeAuthor(author);
    };
    
});