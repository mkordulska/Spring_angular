angular.module('app.books').controller('BookSearchController', function ($scope, $window, $location, bookService, bookAddService, Flash, $modal) {
    'use strict';

    $scope.books = [];
    $scope.gridOptions = { data: 'books' };
    $scope.prefix = '';

    var removeBookById = function (bookId) {
        for (var i = 0; i < $scope.books.length; i = i + 1) {
            if ($scope.books[i].id === bookId) {
                $scope.books.splice(i, 1);
                break;
            }
        }
    };

    $scope.search = function () {
        bookService.search($scope.prefix).then(function (response) {
            angular.copy(response.data, $scope.books);
        }, function () {
            Flash.create('danger', 'Wyjątek', 'custom-class');
        });
    };

    $scope.deleteBook = function (bookId) {
        bookService.deleteBook(bookId).then(function () {
            removeBookById(bookId);
            Flash.create('success', 'Książka została usunięta.', 'custom-class');
        });
    };

    $scope.addBook = function () {
        $location.url('/books/add-book');
    };
    
    $scope.editBook = function (book) {
        $modal.open({
            templateUrl: 'books/html/edit-book-modal.html',
            controller: 'BookEditModalController',
            size: 'sm',
        }).result.then(function(response){
           	book.title = response;
           	bookAddService.saveBook(book);
            Flash.create('success', 'Tytuł został zmieniony.', 'custom-class');
        });
    };

});
