angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $rootScope, $ionicModal, $timeout, $location, $ionicLoading, $ionicPopup, AuthService) {
    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
        $scope.modal.show();
    };

    // Logout confirmation
    $scope.logout = function() {
        $ionicPopup.confirm({
             title: 'Logout',
             template: 'Are you sure you want logout?'
        })
        .then(function(res) {
            if(res) {
                $scope.login();
            }
        });
    };


    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
        __loading($ionicLoading);
        AuthService.login($scope.loginData)
            .success(function (){
                $ionicLoading.hide();
                $scope.closeLogin();

                $rootScope.$broadcast('login');
                $location.path('/app/calendar');
            })
            .error(function (data, status, headers, config){
                $ionicLoading.hide();

                console.log(status, data);
                if (status==409){
                    var confirmPopup = $ionicPopup.confirm({
                        title: 'Authentication Failed',
                        template: 'Sorry! The information you have entered are not valid'
                    });
                }
            })
        ;
    };

    //----- event handlers
    $scope.$on('login', function () {
        $scope.login();
    });

})


.controller('BlogController', function($scope, $ionicLoading, $ionicPopup, BlogService) {
    $scope.posts = {};
    $scope.limit = 25;
    $scope.offset = 0;
    $scope.hasMore = false;

    //----- functions
    $scope.refresh = function (){
        $scope.offset = 0
        $scope.hasMore = false;
        $scope.posts = {};

        $scope.__load(function(){
            $scope.$parent.$broadcast('scroll.refreshComplete');
        });
    }

    $scope.loadMore = function(){
        $scope.__load(function(){
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    }

    $scope.__load = function(callback){
        BlogService.all($scope.limit, $scope.offset)
            .success(function(data){
                if ($scope.posts instanceof Array){
                    for (var i=0 ; i<data.length ; i++){
                        $scope.posts.push(data[i]);
                    }
                } else {
                    $scope.posts = data;
                }
                $scope.__loaded(data);

                if (callback){
                    callback(data);
                }
            })
            .error(function (data, status, headers, config){
                $ionicLoading.hide();

                console.log(status, data, headers, config);
                if (status==401){
                    $rootScope.$broadcast('logout');
                } else {
                    var confirmPopup = $ionicPopup.confirm({
                        title: 'Failure',
                        template: 'Sorry! Unable to fetch the data'
                    });
                }
            })
            ;
    }
    $scope.__loaded = function(data){
        $scope.hasMore = data.length > 0;
        if ($scope.hasMore){
            $scope.offset = $scope.offset + data.length;
        }
    }

    //----- event handlers
    $scope.$on('login', function () {
        $scope.offset = 0
        $scope.hasMore = false;
        $scope.posts = {};
    });



    //------ Main
    // Loading...
    __loading($ionicLoading);
    $scope.__load(function(){
        $ionicLoading.hide();
    });
})

.controller('BlogPostController', function($scope, $stateParams, $sce, $ionicLoading, BlogService) {
    $scope.post = {};

    // Loading...
    __loading($ionicLoading);

    // Done
    BlogService.get($stateParams.postId).success(function(data){
        $sce.trustAsHtml(data.content);

        $scope.post = data;
        $scope.loaded = true;

        $ionicLoading.hide();
    });
})
;

function __loading($ionicLoading){
    $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });
}
