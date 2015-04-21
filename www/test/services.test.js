describe('Unit: BlogController', function() {

    var $controller;
    var $scope;
    var $ionicLoading;
    var blog;
    var ctl;

    beforeEach(module('starter'));
    beforeEach(inject(function($injector) {
        // Create a new scope that's a child of the $rootScope
        $scope = $injector.get("$rootScope").$new();
        $controller = $injector.get("$controller");
        $ionicLoading = $injector.get("$ionicLoading");
        blog = $injector.get("BlogService");

        // Create the controller
        ctrl = $controller('BlogController', {
            $scope: $scope,
            $ionicLoading: $ionicLoading,
            BlogService: blog
        });
    }));

    it('foo=bar', function () {
        expect($scope.foo).toEqual('bar');
    });
})