angular.module('myApp',[]);

//setting request headers
angular.module('myApp').config(function($httpProvider) {
	//$httpProvider.defaults.headers.common.Accept = "application/json";
    $httpProvider.defaults.headers.common.Accept = "text/html";

    //$httpProvider.defaults.transformRequest = function(data, getHeaders) {  //or
    $httpProvider.defaults.transformRequest.push(function(data, getHeaders) {
    	var headers = getHeaders();     //obtain the headers
        console.log(headers);
        headers['Content-Type'] = 'text/plain'; // add a header dynamical
        console.log(data);
        return JSON.stringify(data); //return serialized data
    });


    $httpProvider.defaults.transformResponse = function(data, getHeaders) { //注意经过transformResonse 后, 返回的数据会是string
        var headers = getHeaders();     //obtain the headers
        console.log(headers);
        headers['Content-Type'] = 'text/plain'; // add a header dynamical

        console.log(typeof data);
        //data['hello']='something else'; //change the response
        console.log(data);
        //console.log(JSON.stringify(data));
        return JSON.parse(data); //return serialized data
        //return data;

    };

});

// or 
/*angular.module('myApp').run(function($http) {
	$http.defaults.headers.common.Accept = 'application/json';
});*/


angular.module('myApp').factory('weatherService',function($http) {
	return {
        getWeather: function(city, country) {
            var query = city + ',' + country;
            return $http.get('http://api.openweathermap.org/data/2.5/weather',{
                params: {
                    q: query
                },
                cache: true
            }).then(function(responce) {   // then() return a promise which is resolved with return value of success callback
                console.log(typeof responce.data);
            	return responce.data.weather[0].description;    //extract weather data
            })
        }
    }
});

angular.module('myApp').controller('MainController',function() {
	
});

angular.module('myApp').controller('WeatherController',function($scope, weatherService) {
    $scope.getWeather = function() {
    	$scope.weatherDescription = 'Feathing...';
        weatherService.getWeather($scope.city, $scope.country).then(function(data) {
        	$scope.weatherDescription = data;
        },function() {
        	$scope.weatherDescription = 'Could not obtain data';
        });
    }
});


angular.module('myApp').factory('customInterceptor',function($q, dependency1, dependency2) {
	return {
        request: function(config) {
            //A request interceptor is called before the request is sent to server and is passed a request config object.
            //You can either return a modified/new config object here
            //You can also return a Promise which resolves with a config object
            //In case of any error you can return a Promise that is rejected or throw an exception
            return config;
        },

        requestError: function(rejectionReason) {
            //If a previous request interceptor returned a rejected Promise, this interceptor is called
            //You might try to recover from the error here and return a new config.
            // If all else fails let it fail by returning a promise that is always rejected
            if(ableToRecover(rejectionReason)) {
                //constructs a config object
                return config;
            }
            else
                return $q.reject('Could not recover'); //return a Promise which always rejects
        },
        response: function(response) {
            // This interceptor is called when $http receives the response from the backend.
            // but before the response is handed to the application code the interceptor kicks in.
            // The response object contains: data,status,config, headers and statusText.
            // You return a new/modified response or a Promise that resolves with a response object.
            // In case of error return a Promise that's always rejected.
            return response;
        },

        responseError:function(rejectionReason){
            // Sometimes a backend call may fail
            // Or a previous response interceptor may return a rejected Promise
            // In that case you might try to recover from that here
            if(ableToRecover(rejectionReason)){
                //create a response here
                return response; //You may also return a Promise here
            }
            else
                return $q.reject('Could not recover'); //return a Promise which always rejects
        }
    }
});
