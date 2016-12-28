

var app = angular.module('Home', []);
app.controller('HomeController', function($scope, postService, $http) {
   
   
    $scope.registration = function(registerValue) {
    	alert("registerValue");
    var apilink = "http://10.30.53.156:8086/mining/ms/register";
	
	
	$scope.postresponse = postService.restFunction(apilink, registerValue);
    };
});

app.service('postService', function($http) {
	this.restFunction = function(api, valuePost) {
		console.log(api, valuePost);
		$http.post(api,valuePost).then(function(response) {
			$scope.myWelcome = response.data;
			return $scope.myWelcome;
		});
	};
});

/*
 * function HelloCtrl($scope, testService) { $scope.fromService =
 * testService.sayHello("World","welcome"); }
 */