'use strict';

var alert = alert;

angular.module('app.services', [])

.service('AlbumsService', function ($http) {
    this.query = function () {
        return $http.get('/api/albums');
    };

    this.save = function (newAlbum) {
        return $http.post('/api/albums', newAlbum);
    };

    this.toggleStatus = function (id, currentStatus) {
        return $http.put('/api/albums/' + id, {public: !currentStatus});
    };

    this.delete = function (id) {
        return $http.delete('/api/albums/' + id);
    };
})

.service('SessionsService', function ($http) {
    this.register = function (user) {
        return $http.post('/api/users', user);
    };

    this.login = function (username, password) {
        var loginAttempt = {
            username: username,
            password: password
        };

        return $http.post('/api/sessions', loginAttempt)
            .success(function (response) {
                $http.defaults.headers.common['x-auth'] = response.token;
                return response;
            })
            .error(function (message, status) {
                if (status === 404) {
                    alert('Wrong username or password'); // TODO: do this in controller somehow
                }
            });
    };

    this.logout = function () {
        delete $http.defaults.headers.common['x-auth'];
    };
});