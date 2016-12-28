'use strict';

// declare modules
angular.module('Authentication', []);
angular.module('Navigate', []);
angular.module('Home', []);

angular.module('BasicHttpAuthExample', [
    'Authentication',
    'Home',
    'Navigate',
    'ngRoute',
    'ngCookies',
    'ngResource'
])
 
.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'modules/authentication/views/login.html',
            hideMenus: true
        })
 
        .when('/signup', {
            controller: 'HomeController',
            templateUrl: 'modules/home/views/home.html'
        })
        
        .when('/homepage', {
            
            templateUrl: 'modules/navigate/views/navigation.html'
        })
 
        .otherwise({ redirectTo: '/login' });
}])
 
.run(['$rootScope', '$location', '$cookieStore', '$http', '$window', '$resource', 
      function ($rootScope, $location, $cookieStore, $http, $window, $resource) {
        // keep user logged in after page ref,resh
        $rootScope.globals = $cookieStore.get('globals') || {};
        $rootScope.sessionName = '';
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; 
            //console.log($rootScope.globals.currentUser.username);// jshint ignore:line
        }
        
 
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
        	/*console.log("2nd" + $rootScope.globals.currentUser.username);
        	   $window.sessionStorage.setItem("SavedString","I'm a value saved with SessionStorage");
        	    
        	    //RETRIEVE VALUE
        	    $scope.sessionname = $window.sessionStorage.getItem("SavedString");*/
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
    }]);