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

    
    it('search was called', inject(function (bookRestService, $httpBackend) {
       	// given
	    var url = '/context.html/rest/books/books-by-title?titlePrefix=T';
	    var httpResponse = [{id: 1, title: 'test'}];
	    $httpBackend.expectGET(url).respond(200, httpResponse);
	    // when
	    var promise = bookRestService.search('T');
	    $httpBackend.flush();
	    // then
	    expect(promise.then).toBeDefined();
    }));
    
});