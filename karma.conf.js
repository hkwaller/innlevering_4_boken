'use strict';

module.exports = function(config) {
    config.set({
        frameworks: ['mocha', 'chai'],
        files: [
            'angular/node_modules/angular/angular.js',
            'angular/node_modules/angular-route/angular-route.js',
            'angular/node_modules/angular-mocks/angular-mocks.js',
            'angular/js/app.js',
            'angular/js/controllers.js',
            'angular/js/services.js'
        ],
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: false
    });
};