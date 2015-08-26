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
    
    it('addBook is defined', inject(function ($controller) {
    	// when
    	$controller('BookSearchController', {$scope: $scope});
    	// then
    	expect($scope.addBook).toBeDefined();
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
    
//    it('edit book should call bookAddService.saveBook', inject(function ($controller, $q, bookAddService, $modal) {
//    	// given    	
//    	$controller('BookSearchController', {$scope: $scope});
//        var fakeModal = {
//    		    result: {
//    		        then: function(confirmCallback, cancelCallback) {
//    		            this.confirmCallBack = confirmCallback;
//    		            this.cancelCallback = cancelCallback;
//    		        }
//    		    },
//    		    close: function( item ) {
//    		        this.result.confirmCallBack( item );
//    		    },
//    		    dismiss: function( type ) {
//    		        this.result.cancelCallback( type );
//    		    }
//    		};
//    	var updatedBook = {id: 1, title:'newTitle'};
//    	var updateDeferred = $q.defer();
//        $scope.books = [{id: 1, title: 'title'}];
//        
//    	spyOn(bookAddService, 'saveBook').and.returnValue(updateDeferred.promise);
//    	spyOn($modal, 'open').and.returnValue(fakeModal);
//    	
//    	// when
//    	$scope.editBook($scope.books[0]);
//    	fakeModal.close(updatedBook.title);
//    	updateDeferred.resolve();
//    	$scope.$digest();
//    	
//    	// then
//    	expect(bookAddService.saveBook).toHaveBeenCalledWith(updatedBook);
//    	expect($scope.books[0].title).toBe('newTitle');
//    }));
    
    it('addBook should call $location.url', inject(function ($controller, $location) {
    	// given   	
    	$controller('BookSearchController', {$scope: $scope});
    	
    	spyOn($location, 'url');
    	
    	// when
    	$scope.addBook();
    	
    	// then
    	expect($location.url).toHaveBeenCalledWith('/books/add-book');
    }));
    
    it('edit book should call bookAddService.save', inject(function ($controller, $q, $modal, bookAddService, Flash){
    	//given
    	$controller('BookSearchController', {$scope: $scope});
    	$scope.books = [{id:1, title:'title', authors:[{id:1, firstName:'firstName', lastName:'lastName'}]}];
    	var title = 'updatedTitle';
    	var editDeferred = $q.defer();
    	var modalDeferred = $q.defer();
    	spyOn($modal, 'open').and.returnValue({result: modalDeferred.promise});
    	spyOn(bookAddService, 'saveBook').and.returnValue(editDeferred.promise);
    	spyOn(Flash, 'create');
    	//when
    	$scope.editBook($scope.books[0]);
    	modalDeferred.resolve(title);
    	editDeferred.resolve();
    	$scope.$digest();
    	//then
    	expect($scope.books[0].title).toBe(title);
    	expect(bookAddService.saveBook).toHaveBeenCalledWith($scope.books[0]);
    	expect(Flash.create).toHaveBeenCalledWith('success', 'Tytuł został zmieniony.', 'custom-class');
  }));

});
