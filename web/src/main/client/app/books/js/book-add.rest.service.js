angular.module('app.books').factory('bookAddRestService', function ($http, currentContextPath) {
    'use strict';

    return {
        saveBook: function (book) {
            return $http.post(currentContextPath.get() + 'rest/books/book', book);
        }
    };
});
