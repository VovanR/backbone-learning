// See: http://gulpjs.com/

var gulp = require('gulp');
var connect = require('gulp-connect');

gulp.task('html', function () {
    gulp.src('./src/*.html')
        .pipe(connect.reload());
});

gulp.task('scripts', function () {
    gulp.src('./src/scripts/**/*.js')
        .pipe(connect.reload());
});

gulp.task('connect', function () {
    connect.server({
        root: 'src',
        port: 8000,
        livereload: true,
    });
});

gulp.task('watch', function () {
    gulp.watch(['./src/*.html'], ['html']);
    gulp.watch(['./src/scripts/**/*.js'], ['scripts']);
});

gulp.task('default', ['connect', 'watch']);
