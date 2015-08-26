describe('book edit modal controller', function () {
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
  
    it('edit is defined', inject(function ($controller) {
    	// when
    	$controller('BookEditModalController', {$scope: $scope, $modalInstance: $modalInstance});
    	// then
    	expect($scope.edit).toBeDefined();
    }));
    
    it('edit should call modalInstance.close', inject(function ($controller){
    	//given
    	$controller('BookEditModalController', {$scope: $scope, $modalInstance: $modalInstance});
    	$scope.title = 'test';
    	$scope.titleForm = {
    		$valid: true
    	};
    	spyOn($modalInstance, 'close');
    	//when
    	$scope.edit();
    	//then
    	expect($modalInstance.close).toHaveBeenCalledWith($scope.title);
    }));
     
});