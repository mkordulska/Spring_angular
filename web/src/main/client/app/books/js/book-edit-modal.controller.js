angular.module('app.books').controller('BookEditModalController', function ($modalInstance, $scope) {
    'use strict';
    $scope.title = '';
    $scope.edit = function(){
    	if ($scope.titleForm.$valid) {
    	    $modalInstance.close($scope.title);
    	}
    };
});