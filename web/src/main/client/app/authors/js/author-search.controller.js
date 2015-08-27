angular.module('app.authors').controller('AuthorSearchController', function ($scope, $window, $location, authorService, Flash) {
    'use strict';

    $scope.authors = [];
    $scope.gridOptions = { data: 'authors' };
    $scope.prefix='';
    $scope.queryBy='$';

    $scope.search = function () {
        authorService.search().then(function (response) {
            angular.copy(response.data, $scope.authors);
        }, function () {
            Flash.create('danger', 'Wyjątek', 'custom-class');
        });
    };

    $scope.search();
       
    $scope.searchAuthor = function (actual, expected) {
 	    var lowerStr = (actual + '').toLowerCase();
 	    return lowerStr.indexOf(expected.toLowerCase()) === 0;
 	};


});
