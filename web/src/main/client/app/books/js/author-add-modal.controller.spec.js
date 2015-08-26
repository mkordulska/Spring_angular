describe('author add modal controller', function () {
    'use strict';

    beforeEach(function () {
        module('app.main');
        module('flash');
        module('app.books');
    });

    var $scope;
    var $modalInstance = {close: function () {}};
    
    beforeEach(inject(function ($rootScope) {
        $scope = $rootScope.$new();
    }));
  
    it('save author is defined', inject(function ($controller) {
    	// when
    	$controller('AuthorAddModalController', {$scope: $scope, $modalInstance: $modalInstance});
    	// then
    	expect($scope.saveAuthor).toBeDefined();
    }));
    
    it('save author should call modalInstance.close', inject(function ($controller){
    	//given
    	$controller('AuthorAddModalController', {$scope: $scope, $modalInstance: $modalInstance});
    	$scope.author = {firstName: 'firstName', lastName: 'lastName'};
    	$scope.authorForm = {
    		$valid: true
    	};
    	spyOn($modalInstance, 'close');
    	//when
    	$scope.saveAuthor();
    	//then
    	expect($modalInstance.close).toHaveBeenCalledWith($scope.author);
    }));
     
});