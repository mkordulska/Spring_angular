describe('book add rest service', function () {
    'use strict';
    
    beforeEach(function () {
        module('app.main');
        module('app.books');
    });
    
    it('saveBook is defined', inject(function (bookAddRestService) {
    	// then
    	expect(bookAddRestService.saveBook).toBeDefined();
    }));
   
    it('saveBook was called', inject(function (bookAddRestService, $httpBackend) {
    	// given
    	var url = '/context.html/rest/books/book';
    	var book = {id:1, title: 'testTitle', authors:[{id:1, firstName:'firstName', lastName:'lastName'}]};
    	$httpBackend.expectPOST(url, book).respond(200, book);
    	//then
    	bookAddRestService.saveBook(book).then(function (response) {
    		expect(response.status).toBe(200);
    		expect(response.data).toEqual(book);
    	});
    	$httpBackend.flush();
	    }));

});