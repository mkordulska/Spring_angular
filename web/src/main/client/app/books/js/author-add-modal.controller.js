angular.module('app.books').controller('AuthorAddModalController', function ($modalInstance, $scope) {
    'use strict';
    $scope.author = {firstName: undefined, lastName: undefined};
    $scope.saveAuthor = function(){
    	if ($scope.authorForm.$valid) {
    	    $modalInstance.close($scope.author);
    	}
    };
});