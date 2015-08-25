describe('book add rest service', function () {
    'use strict';
    
    beforeEach(function () {
        module('app.main');
        module('app.books');
    });

//  it('saveBook was called', inject(function (bookAddRestService, $http) {
//	var book = {id: null, title: 'test'};
//    spyOn($http,'post');
//    bookAddRestService.saveBook(book);
//    expect($http.post).toHaveBeenCalledWith( '/context.html/rest/books/book', book);
//  }));
    
    it('saveBook was called', inject(function (bookAddRestService, $httpBackend) {
    	// given
	    var url = '/context.html/rest/books/book';
	    var httpResponse = {id: 1, title: 'test'};
	    $httpBackend.expectPOST(url).respond(200, httpResponse);
	    // when
	    var promise = bookAddRestService.saveBook({id: null, title: 'test'});
	    $httpBackend.flush();
	    // then
	    expect(promise.then).toBeDefined();
	    }));

});