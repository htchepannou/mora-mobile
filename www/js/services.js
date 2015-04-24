var host = 'www.insidesoccer.com';
var securityApi = 'http://' + host + ':18080';
var postApi = 'http://' + host + ':18082';

angular.module('starter.services', [])
.factory('AuthService', function($http){
    return{
        api: securityApi + '/access_token',

        login : function (request){
            return $http.put(this.api, request).success(function(token){
                localStorage["access_token"] = token.value;
            });
        },

        logout : function (){
            var access_token = localStorage["access_token"];
            return $http({
               method: 'DELETE',
               url: this.api,
               headers:{
                   "X_AUTH_TOKEN": access_token
               }
           });
        }
    }
})

.factory('BlogService', function($http, $sce){
    return{
        all : function (limit, offset){
            var access_token = localStorage["access_token"];
            return $http({
                method: 'GET',
                url: postApi + "/posts?limit=" + limit + "&offset=" + offset,
                headers:{
                    "X_AUTH_TOKEN": access_token
                }
            });
        },

        get : function (id){
            return $http({
                method: 'GET',
                url: postApi + "/posts/" + id
            });
        }

    }
})
;