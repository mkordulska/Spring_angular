describe('author search service', function () {
    'use strict';

    beforeEach(function () {
        module('app.main');
        module('app.authors');
    });

    it('search is defined', inject( function (authorService){
    	//then
    	expect(authorService.search).toBeDefined();
    }));
    
    it('search should call authorRestService.search', inject( function (authorService, authorRestService){
    	//given
    	spyOn(authorRestService, 'search');
    	//when
    	authorService.search();
    	//then
    	expect(authorRestService.search).toHaveBeenCalled();
    }));
});