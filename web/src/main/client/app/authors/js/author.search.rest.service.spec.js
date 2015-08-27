describe('author search rest service', function () {
    'use strict';

    beforeEach(function () {
        module('app.main');
        module('app.authors');
    });
    
    var httpBackend;
    beforeEach(inject(function ($httpBackend) {
    	httpBackend = $httpBackend;
    }));
    
    it('search is defined', inject( function (authorRestService){
    	//then
    	expect(authorRestService.search).toBeDefined();
    }));
    
    it('search should send get request', inject (function(authorRestService){
    	var authors = [{id:1, firstName:'firstName', lastName:'lastName'}];
    	var url = '/context.html/rest/authors/author-list';
    	httpBackend.expectGET(url).respond(200, authors);
    	
    	authorRestService.search().then(function(response) {
    		expect(response.status).toBe(200);
    		expect(response.data).toEqual(authors);  		
    	});
    	httpBackend.flush();
    }));
});