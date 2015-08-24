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

        $scope.book ={id: null, title: 'test'};
        var saveDeferred = $q.defer();
        spyOn(bookAddService, 'saveBook').and.returnValue(saveDeferred.promise);
        // when
        $scope.saveBook();
        saveDeferred.resolve({data: {id: 1, title: 'test'}});
        $scope.$digest();
        // then
        expect(bookAddService.saveBook).toHaveBeenCalledWith($scope.book);
        expect($scope.books.length).toBe(1);
        expect($scope.books[0].id).toBe(1);
        expect($scope.books[0].title).toBe('test');
    }));

});
