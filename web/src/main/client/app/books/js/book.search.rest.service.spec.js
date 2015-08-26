describe('book rest service', function () {
    'use strict';
    
    beforeEach(function () {
        module('app.main');
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

    
    it('search was called', inject( function (bookRestService, $httpBackend) {
    	//given
    	var titlePrefix = 'T';
    	var books = [{id:1, title: 'test', authors:[{firstName:'testFirstName', lastName:'testLastName'}]}];
    	var url = '/context.html/rest/books/books-by-title?titlePrefix=' + titlePrefix;
    	$httpBackend.expectGET(url).respond(200, books);
    	//then
    	bookRestService.search(titlePrefix).then(function(response) {
    		expect(response.status).toBe(200);
    		expect(response.data).toEqual(books);  		
    	});
    	$httpBackend.flush();
    }));
    
    it('delete book was called', inject (function (bookRestService, $httpBackend) {
    	//given
    	var bookId = 1;
    	var url = '/context.html/rest/books/book/' + bookId;
    	$httpBackend.expectDELETE(url).respond(200);
    	//then
    	bookRestService.deleteBook(bookId).then(function(response) {
    		expect(response.status).toBe(200);
    	});
    	$httpBackend.flush();
    }));
    
});