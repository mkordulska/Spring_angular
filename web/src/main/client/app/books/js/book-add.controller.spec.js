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

    it('saveBook is defined', inject(function ($controller) {
        // when
        $controller('BookAddController', {$scope: $scope});
        // then
        expect($scope.saveBook).toBeDefined();
    }));
    
    it('addAuthor is defined', inject(function ($controller) {
        // when
        $controller('BookAddController', {$scope: $scope});
        // then
        expect($scope.addAuthor).toBeDefined();
    }));
    
    it('deleteAuthor is defined', inject(function ($controller) {
    	// when
    	$controller('BookAddController', {$scope: $scope});
    	// then
    	expect($scope.deleteAuthor).toBeDefined();
    }));

    it('save book should call bookAddService.saveBook when titleForm is valid', inject(function ($controller, $q, bookAddService, Flash) {
        // given
        $controller('BookAddController', {$scope: $scope});
       	$scope.titleForm = {
        		$valid: true	
        };
       	var book = {id: null, title: 'test', authors: [{firstName: 'firstName', lastName: 'lastName'}]};
        $scope.book = book;
        var saveDeferred = $q.defer();
        spyOn(bookAddService, 'saveBook').and.returnValue(saveDeferred.promise);
        spyOn(Flash, 'create');
        // when
        $scope.saveBook();
        saveDeferred.resolve({data: {id: 1, title: 'test', authors: [{firstName: 'firstName', lastName: 'lastName'}]}});
        $scope.$digest();
        // then
        expect(bookAddService.saveBook).toHaveBeenCalledWith(book);
        expect($scope.book.id).toBe(1);
        expect($scope.book.title).toBe('test');
        expect(Flash.create).toHaveBeenCalledWith('success', 'Książka została dodana.', 'custom-class');
    }));
    
    it('save book should call bookAddService.saveBook when titleForm is invalid', inject(function($controller, Flash) {
    	// given
    	$controller('BookAddController', {$scope: $scope});
    	$scope.titleForm = {
    		$valid: false	
    	};
    	spyOn(Flash, 'create');
    	// when
    	$scope.saveBook();
    	// then
    	expect(Flash.create).toHaveBeenCalledWith('danger', 'Błędne dane.', 'custom-class');
    }));
    
    it('add author should add authors to book', inject(function($controller, $modal, $q){
    	//given
    	$controller('BookAddController', {$scope: $scope});
    	var author = {firstName: 'firstName', lastName: 'lastName'};
    	var modalDeferred = $q.defer();
    	spyOn($modal, 'open').and.returnValue({result: modalDeferred.promise});
    	// when
    	$scope.addAuthor();
    	modalDeferred.resolve(author);
    	$scope.$digest();
    	// then
    	expect($scope.book.authors.length).toBe(1);
    	expect($scope.book.authors[0].firstName).toBe('firstName');
    	expect($scope.book.authors[0].lastName).toBe('lastName');
    }));

});
