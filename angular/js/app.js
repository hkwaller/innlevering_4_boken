'use strict';

angular.module('app', [
    'app.controllers',
    'app.services',
    'ngRoute'
])

.config(function ($routeProvider) {
    $routeProvider
        .when('/', {controller: 'MainController', templateUrl: 'main.html'})
        .when('/register', {controller: 'RegisterController', templateUrl: 'register.html'})
        .otherwise({controller: 'NotFoundController', templateUrl: 'not_found.html'});
})

.run(function ($rootScope, $location) {
    var url = 'ws://' + $location.host() + ':' + $location.port();
    var connection = new WebSocket(url);

    connection.onmessage = function (event) {
        var payload = JSON.parse(event.data);
        var eventName = 'ws:' + payload.topic;

        $rootScope.$broadcast(eventName, payload.data);
    };
});
