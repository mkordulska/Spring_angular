describe('book edit modal controller', function () {
    'use strict';

    beforeEach(function () {
        module('app.main');
        module('flash');
        module('app.books');
    });

    var $scope;
    var modalInstance = { close: function() {}, dismiss: function() {} };
    
    beforeEach(inject(function ($rootScope) {
        $scope = $rootScope.$new();
    }));
  
    it('confirm is defined', inject(function ($controller) {
    	// when
    	$controller('BookEditModalController', {$scope: $scope, $modalInstance: modalInstance});
    	// then
    	expect($scope.edit).toBeDefined();
    }));
     
});