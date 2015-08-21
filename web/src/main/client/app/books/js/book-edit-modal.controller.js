angular.module('app.books').controller('BookEditModalController', function ($modalInstance, $scope) {
    'use strict';
    $scope.title = '';
    $scope.edit = function(){
    	    $modalInstance.close($scope.title);
    };
});