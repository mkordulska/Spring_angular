angular.module('app.books').factory('bookAddService', function (bookAddRestService) {
    'use strict';

    return {
        saveBook: function (book) {
            return bookAddRestService.saveBook(book);
        }
    };
});