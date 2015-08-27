describe('author controller', function () {
    'use strict';

    beforeEach(function () {
        module('app.main');
        module('flash');
        module('app.authors');
    });

    var $scope;
    beforeEach(inject(function ($rootScope) {
        $scope = $rootScope.$new();
    }));
    var searchDeferred;
    var init=inject(function($q,authorService){
    	searchDeferred = $q.defer();
    	var getSpyCount = 0;
    	spyOn(authorService, 'search').and.callFake(function () {
    		getSpyCount = getSpyCount + 1;
    		if (getSpyCount === 1) {
    			return {then: angular.noop};
    		}
    		else if (getSpyCount === 2) {
    			return searchDeferred.promise;
    		}
    	});
    });

    it('search is defined', inject(function ($controller) {
        // when
        $controller('AuthorSearchController', {$scope: $scope});
        // then
        expect($scope.search).toBeDefined();
    }));
    
    it('searchAuthor is defined', inject(function ($controller) {
        // when
        $controller('AuthorSearchController', {$scope: $scope});
        // then
        expect($scope.searchAuthor).toBeDefined();
    }));
    
    it('search author should call authorService.search', inject(function ($controller, $q, authorService){
    	//given
    	init();
       	$controller('AuthorSearchController', {$scope: $scope});
      	var authors = [{id:1, firstName:'firstName', lastName:'lastName'}];
        // when
    	$scope.search();
    	searchDeferred.resolve({data: authors});
    	$scope.$digest();
        // then
    	expect(authorService.search).toHaveBeenCalled();
    	expect($scope.authors.length).toBe(1);
    	expect($scope.authors[0].firstName).toBe('firstName');
    	expect($scope.authors[0].lastName).toBe('lastName');
 
    }));
    
    it('search author should return true', inject(function ($controller) {
    	//given
    	$controller('AuthorSearchController', {$scope: $scope});
    	var expected= 't';
    	var actual = 'test';
    	//then
    	expect($scope.searchAuthor(actual,expected)).toBe(true);
    }));
    
    it('search author should return false', inject(function($controller) {
    	//given
    	$controller('AuthorSearchController', {$scope: $scope});
    	var expected= 'e';
    	var actual = 'test';
    	//then
    	expect($scope.searchAuthor(actual,expected)).toBe(false);
    }));

});
