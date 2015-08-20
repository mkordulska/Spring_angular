angular.module('app.books').factory('bookAddService', function (bookRestService) {
    'use strict';

    return {
        saveBook: function (book) {
            return bookRestService.saveBook(book);
        }
    };
});