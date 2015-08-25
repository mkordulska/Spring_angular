describe('book service', function () {
    'use strict';

    beforeEach(function () {
        module('app.main');
        module('flash');
        module('app.books');
    });

    it('search is defined', inject(function (bookService) {
        // then
        expect(bookService.search).toBeDefined();
    }));
    
    it('deleteBook is defined', inject(function (bookService) {
    	// then
    	expect(bookService.deleteBook).toBeDefined();
    }));

    
    it('search should call bookRestService.search', inject(function (bookService, bookRestService) {
        // given
        var books = [{id: 1, title: 'test'}];    
        spyOn(bookRestService, 'search').and.returnValue(books); 
        // when
        bookService.search('T');   
        // then
        expect(bookRestService.search).toHaveBeenCalledWith('T');
    }));
    
    it('delete book should call bookRestService.deleteBook', inject(function (bookService, bookRestService) {
    	// given
        var bookId = 1;
    	spyOn(bookRestService, 'deleteBook');
    	// when
    	bookService.deleteBook(bookId);   
    	// then
    	expect(bookRestService.deleteBook).toHaveBeenCalledWith(bookId);
    }));

});