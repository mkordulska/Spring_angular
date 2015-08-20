angular.module('app.books').factory('bookRestService', function ($http, currentContextPath) {
    'use strict';

    return {
        saveBook: function (book) {
            return $http.post(currentContextPath.get() + 'rest/book', book);
        }
    };
});
