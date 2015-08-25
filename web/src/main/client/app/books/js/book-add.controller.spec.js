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

    it('save book should call bookAddService.saveBook', inject(function ($controller, $q, bookAddService) {
        // given
        $controller('BookAddController', {$scope: $scope});

        var book = {id: null, title: 'test'};
        $scope.book = book;
        var saveDeferred = $q.defer();
        spyOn(bookAddService, 'saveBook').and.returnValue(saveDeferred.promise);
        // when
        $scope.saveBook();
        saveDeferred.resolve({data: {id: 1, title: 'test'}});
        $scope.$digest();
        // then
        expect(bookAddService.saveBook).toHaveBeenCalledWith(book);
        expect($scope.book.id).toBe(1);
        expect($scope.book.title).toBe('test');
    }));
    
    
});
