describe('book controller', function () {
    'use strict';

    beforeEach(function () {
        module('app.main');
        module('flash');
        module('app.books');
    });

    var $scope;
    beforeEach(inject(function ($rootScope) {
        $scope = $rootScope.$new();
    }));

    it('search is defined', inject(function ($controller) {
        // when
        $controller('BookSearchController', {$scope: $scope});
        // then
        expect($scope.search).toBeDefined();
    }));
    
    it('deleteBook is defined', inject(function ($controller) {
        // when
        $controller('BookSearchController', {$scope: $scope});
        // then
        expect($scope.deleteBook).toBeDefined();
    }));
    
    it('editBook is defined', inject(function ($controller) {
        // when
        $controller('BookSearchController', {$scope: $scope});
        // then
        expect($scope.editBook).toBeDefined();
    }));

    it('delete book should call bookService.deleteBook', inject(function ($controller, $q, bookService, Flash) {
        // given
    	
        $controller('BookSearchController', {$scope: $scope});

        var bookId = 1;
        $scope.books = [{id: bookId, title: 'test'}];
        var deleteDeferred = $q.defer();
        spyOn(bookService, 'deleteBook').and.returnValue(deleteDeferred.promise);
        spyOn(Flash, 'create');
        // when
        $scope.deleteBook(bookId);
        deleteDeferred.resolve();
        $scope.$digest();
        // then
        expect(bookService.deleteBook).toHaveBeenCalledWith(bookId);
        expect(Flash.create).toHaveBeenCalledWith('success', 'Książka została usunięta.', 'custom-class');
        expect($scope.books.length).toBe(0);
    }));
    
    it('search book should call bookService.search', inject(function ($controller, $q, bookService) {
    	// given
    	$controller('BookSearchController', {$scope: $scope});
    	
    	var searchDeferred = $q.defer();
    	$scope.prefix = 'T';
    	spyOn(bookService, 'search').and.returnValue(searchDeferred.promise);
    	// when
    	$scope.search();
    	searchDeferred.resolve({data: [{id: 1, title: 'test'}]});
    	$scope.$digest();
    	// then
    	expect(bookService.search).toHaveBeenCalledWith($scope.prefix);
    	expect($scope.books.length).toBe(1);
    	expect($scope.books[0].id).toBe(1);
    	expect($scope.books[0].title).toBe('test');
    }));

});
