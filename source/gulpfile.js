var path = require('path');
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var rename = require('gulp-rename');

// includes
var bourbon = require('bourbon').includePaths;
var neat = require('bourbon-neat').includePaths;
var normalizeCSS = path.join(__dirname, 'node_modules/normalize.css');

var targetPath = path.join(__dirname, '../lms/static/sass');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function () {

    // Run in proxy mode with static files also served
    // from current directory + ./app/css
    browserSync.init({
        proxy: 'https://courses.ed-era.com/',
        https: true,
        serveStatic: ['app/css', 'app/js', '../lms'],
        rewriteRules: [
            {
                match: /<link.*lms\-main.*>/i,
                fn: function (req, res, match) {
                    return '<link rel="stylesheet" type="text/css" href="/lms-main-v1.css"/>';
                }
            },
            {
                match: /<link.*lms\-course.*>/i,
                fn: function (req, res, match) {
                    return '';
                }
            },
            {
                match: /<link.*lms\-discussion.*>/i,
                fn: function (req, res, match) {
                    return '<link rel="stylesheet" type="text/css" href="/lms-discussion-main.css"/>';
                }
            }
        ]
    });


    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/scss/*.scss', ['sass']);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
    return gulp.src('app/scss/*.scss')
        .pipe(sass({
            // load bourbon and bourbon-neat properly in scss environment
            includePaths: [].concat(
              normalizeCSS,
              bourbon,
              neat
            )
        }))
        .on('error', notify.onError('Error: <%= error.message %>'))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream())

});

// just copies css to OpenEdX theme specific directory for scss
gulp.task('copy-main-css', function() {
    return gulp.src('app/css/lms-main-v1.css')
        .pipe(rename('lms-main-v1.scss'))
        .pipe(gulp.dest(targetPath));
});

gulp.task('copy-course-css', function() {
    return gulp.src('app/css/lms-course.css')
        .pipe(rename('lms-course.scss'))
        .pipe(gulp.dest(targetPath));
});

gulp.task('copy-discussion-css', function() {
    return gulp.src('app/css/lms-discussion-main.css')
        .pipe(rename('lms-discussion-main.scss'))
        .pipe(gulp.dest(targetPath + '/discussion'));
});

gulp.task('build', ['sass', 'copy-main-css', 'copy-course-css', 'copy-discussion-css']);

gulp.task('default', ['serve']);
