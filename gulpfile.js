/*
|-------------------------------------------------------------------------------
| Packages
|-------------------------------------------------------------------------------
|
*/

var gulp         = require('gulp'),
    less         = require('gulp-less'),
    watch        = require('gulp-watch'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglify'),
    minifyCSS    = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer');
    path         = require('path');


/*
|-------------------------------------------------------------------------------
| File destination
|-------------------------------------------------------------------------------
|
*/

var path = {
  css_dest: 'app/css',
  js_dest:  'app/js',
  css_src:  'app/css/src/styles.less',
  js_src:   'app/js/src/**/*.js'
};

var bower_path = {  
  css: [
    "bower_components/bootstrap/dist/css/bootstrap.min.css"
  ],
  js: [
    "bower_components/jquery/jquery.min.js"
  ]
};


/*
|-------------------------------------------------------------------------------
| Vendors
|-------------------------------------------------------------------------------
|
*/

gulp.task('js_vendor', function() {
  gulp.src(bower_path.js)
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(path.js_dest));
});

gulp.task('css_vendor', function() {
  gulp.src(bower_path.css)
    .pipe(concat('vendor.min.css'))
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(minifyCSS())
    .pipe(gulp.dest(path.css_dest));
});


/*
|-------------------------------------------------------------------------------
| Main application
|-------------------------------------------------------------------------------
|
*/

gulp.task('less', function () {
  gulp.src('app/css/src/styles.less')
    .pipe(less())
    .pipe(gulp.dest('app/css'));
})

/*
|-------------------------------------------------------------------------------
| Watch
|-------------------------------------------------------------------------------
|
*/

gulp.task('watch', function() {

  gulp.run('less');
  gulp.watch(path.css_src, ['less']);
});
 
gulp.task('default', ['watch']);
