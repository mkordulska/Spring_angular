angular.module('app.books').controller('BookAddController', function ($scope, $window, $location, bookAddService, Flash, $modal) {
    'use strict';

    $scope.book ={title: '', authors: []};
    
    $scope.saveBook = function () {
    	if($scope.book.authors.length>0 && $scope.titleForm.$valid){
    	bookAddService.saveBook($scope.book).then(function (response) {
            $scope.book = response.data;
            Flash.create('success', 'Książka została dodana.', 'custom-class');
        });
    	}
    	else{
    		Flash.create('danger', 'Błędne dane.', 'custom-class');
    	}
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
    	$scope.book.authors.splice($scope.book.authors.indexOf(author), 1);
    };
    
});