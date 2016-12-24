var gulp = require('gulp'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    pug = require('gulp-pug'),
    browserSync = require('browser-sync');

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
      .pipe(gulp.dest('app/css'));
    });

    // get all files ending with .pug in app/pug

    gulp.task('pug', function () {
      return gulp.src('app/pug/*.pug')
      .pipe(plumber({
          errorHandler: function (error) {
              console.log(error.message);
              this.emit('end');
          }
      }))
      .pipe(pug())
      .pipe(gulp.dest('app/html'));
    });

    gulp.task('pug-rebuild', ['pug'], function () {
	     browserSync.reload();
    });

    gulp.task('default', ['pug-rebuild', 'sass'], function (){
      gulp.watch('app/scss/**/**/*.scss', ['sass']);
      gulp.watch('app/pug/**/**/*.pug', ['pug-rebuild']);
    });
