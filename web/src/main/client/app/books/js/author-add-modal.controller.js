angular.module('app.books').controller('AuthorAddModalController', function ($modalInstance, $scope) {
    'use strict';
    $scope.author = {firstName: undefined, lastName: undefined};
    $scope.saveAuthor = function(){
    	    $modalInstance.close($scope.author);
    };
});