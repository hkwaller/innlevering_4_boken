angular.module('app.controllers', [])

.controller('ApplicationController', function ($scope, $location, SessionsService) {
    $scope.$on('login', function (event, user) {
        $scope.currentUser = user;
    });

    $scope.logout = function () {
        SessionsService.logout();
        delete $scope.currentUser;
        $location.path('register');
    };
})

.controller('MainController', function ($scope, $location, AlbumsService) {
    $scope.albums = [];

    $scope.$on('ws:new public album', function (event, album) {
        if (album.creator !== $scope.currentUser.username) {
            $scope.albums.unshift(album);
            $scope.$apply();
        }
    });

    $scope.$on('ws:removed album', function (event, album) {
        if (album.creator !== $scope.currentUser.username) {
            _.remove($scope.albums, {_id: album._id});
            $scope.$apply();
        }
    });

    AlbumsService.query()
        .success(function (albums) {
            $scope.albums = albums;
        })
        .error(function (data, status) {
            if (status === 401) {
                $location.path('/register');
                alert('You need to be logged in to go here!');
            }
        });

    $scope.newAlbum = {};

    $scope.saveAlbum = function () {
        if (!$scope.newAlbum.title || !$scope.newAlbum.artist) {
            alert('Please enter a title and an artist.');
            return;
        }

        AlbumsService.save($scope.newAlbum)
            .success(function (album) {
                $scope.albums.unshift(album);
                $scope.newAlbum = {};
            });
    };

    $scope.toggleStatus = function (album) {
        AlbumsService.toggleStatus(album._id, album.public).success(function () {
            _.find($scope.albums, function (currentAlbum) {
                if (currentAlbum._id === album._id) {
                    currentAlbum.public = !currentAlbum.public;
                }
            });
        });
    };

    $scope.deleteAlbum = function (id) {
        AlbumsService.delete(id).success(function () {
            _.remove($scope.albums, {_id: id});
        });
    };
})

.controller('RegisterController', function ($scope, $location, SessionsService) {
    $scope.newUser = {};

    $scope.register = function () {
        if (!$scope.newUser.username || !$scope.newUser.password) {
            alert('Please enter a username and password');
            return;
        }

        SessionsService.register($scope.newUser)
            .success(function () {
                SessionsService.login($scope.newUser.username, $scope.newUser.password).then(function (response) {
                    $scope.$emit('login', response.data.user);
                    $location.path('/');
                });
            })
            .error(function (message, status) {
                if (status === 412) { // bad request; username exists
                    alert('Username already exists! Try another.');
                } else {
                    alert(status + ': ' + message);
                }
            });
    };

    $scope.login = function (username, password) {
        SessionsService.login(username, password).then(function (response) {
            $scope.$emit('login', response.data.user);
            $location.path('/');
        });
    };
})

.controller('NotFoundController', function ($scope) {
    $scope.message = 'Not found!';
})
