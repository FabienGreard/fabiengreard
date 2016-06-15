var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    del = require('del'),
    plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    runSequence = require('run-sequence');

    // Gets all files ending with .scss in app/scss

    gulp.task('sass', function(){
        return gulp.src('app/scss/*.scss')
            .pipe(plumber({
                errorHandler: function (error) {
                    console.log(error.message);
                    this.emit('end');
                }
            }))
            .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
            .pipe(autoprefixer())
            .pipe(gulp.dest('app/css'))
            .pipe(browserSync.stream());
    });

    // Use app as default serveur location

    gulp.task('browserSync', function() {
    browserSync({
      server: {
        baseDir: 'app'
      },
    })
  });

  // concat files and optimizes it !

  gulp.task('html', function () {
      return gulp.src('app/*.html')
          .pipe(useref())
          .pipe(gulpif('*.js', uglify()))
          .pipe(gulpif('*.css', minifyCss()))
          .pipe(gulp.dest('dist'));
  });

  gulp.task('images', function(){
    return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(cache(imagemin({
        interlaced: true
      })))
    .pipe(gulp.dest('dist/images'))
  });

  // fonts copy

  gulp.task('fonts', function() {
    return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
  })

  // clean dist all

  gulp.task('clean', function(callback) {
    del('dist');
    return cache.clearAll(callback);
  })

  // clean dist without images

  gulp.task('clean:dist', function(callback){
    del(['dist/**/*', '!dist/images', '!dist/images/**/*'], callback)
  });

  // Reloads the browser whenever HTML or JS files change

  gulp.task('watch', ['browserSync', 'sass'], function (){
    gulp.watch('app/scss/**/*.scss', ['sass']).on('change', browserSync.reload);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
  });

  gulp.task('default', function (callback) {
    runSequence(['sass', 'browserSync', 'watch'],
    callback
    )
  });

  gulp.task('build', function (callback) {
    runSequence(['clean:dist', 'sass', 'html', 'images', 'fonts'],
    callback
    )
  });
