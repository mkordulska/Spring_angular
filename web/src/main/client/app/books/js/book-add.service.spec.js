describe('book add service', function () {
    'use strict';
    
    beforeEach(function () {
        module('app.main');
        module('app.books');
    });

  it('saveBook was called', inject(function (bookAddService, bookAddRestService) {
	var book = {id: null, title: 'test'};
    spyOn(bookAddRestService,'saveBook');
    bookAddService.saveBook(book);
    expect(bookAddRestService.saveBook).toHaveBeenCalledWith(book);
  }));
});