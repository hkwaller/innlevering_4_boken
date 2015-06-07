(function () {
   'use strict';
}());

var gulp =          require('gulp'),
    concat =        require('gulp-concat'),
    uglify =        require('gulp-uglify'),
    ngAnnotate =    require('gulp-ng-annotate'),
    sourcemaps =    require('gulp-sourcemaps'),
    nodemon =       require('gulp-nodemon'),
    livereload =    require('gulp-livereload'),
    //uglifycss =     require('gulp-uglifycss'),
    minifyhtml =    require('gulp-minify-html');


var publicPath = 'angular/public';
var indexPath = 'angular/index.html';
var templatesPath = 'angular/templates/*.html';

gulp.task('js', function() {
    gulp.src(['angular/js/app.js', 'angular/js/*.js'])
            .pipe(sourcemaps.init())
            .pipe(concat('app.js'))
            .pipe(ngAnnotate())
            .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(publicPath))
        .pipe(livereload());
});

gulp.task('css', function() {
//    gulp.src('angular/css/*.css')
//            .pipe(sourcemaps.init())
//            .pipe(concat('site.css'))
//            .pipe(uglifycss())
//        .pipe(sourcemaps.write())
//        .pipe(gulp.dest(publicPath))
});

gulp.task('html', function() {
    var opts = {
        conditionals: true,
        spare:true
    };

    gulp.src([indexPath, templatesPath])
        .pipe(minifyhtml(opts))
        .pipe(gulp.dest(publicPath))
        .pipe(livereload());
});

gulp.task('watch:js', ['js'], function() {
    gulp.watch('angular/js/*.js', ['js']);
});

gulp.task('watch:html', ['html'], function() {
    gulp.watch('angular/**/*.html', ['html']);
});

gulp.task('watch:css', ['css'], function() {
    //gulp.watch('webapp/css/*.css', ['css']);
});

gulp.task('dev', ['watch:js', 'watch:css', 'watch:html', 'dev:server'], function() {
    livereload.listen();
});

gulp.task('dev:server', function() {
    nodemon({
        script: './server/server.js',
        ext:    'js',
        ignore: ['gulp*', 'angular/*']
    });
});

