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

    it('save book should call bookAddService.saveBook', inject(function ($controller, $q, bookAddService) {
        // given
        $controller('BookAddController', {$scope: $scope});

        var book = {id: null, title: 'test'};
        $scope.books = [];
        var saveDeferred = $q.defer();
        spyOn(bookAddService, 'saveBook').and.returnValue(saveDeferred.promise);
        // when
        $scope.saveBook(book);
        saveDeferred.resolve();
        $scope.$digest();
        // then
        expect(bookAddService.saveBook).toHaveBeenCalledWith(book);
        expect($scope.books.length).toBe(1);
//        expect($scope.books[0].id).toBe(1);
        expect($scope.books[0].title).toBe('test');
    }));

});
