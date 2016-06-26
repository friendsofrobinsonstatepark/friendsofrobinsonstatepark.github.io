var gulp = require('gulp');
var jade = require('gulp-jade');
var connect = require('connect');
var less = require('gulp-less');
var entityconvert = require('gulp-entity-convert');

gulp.task('default', ['render-jade','styles','photos','docs','backgrounds','icons'], function(){
});

gulp.task('render-jade', function(){
  gulp.src('./src/*.jade')
                   .pipe(entityconvert())
                   .pipe(jade())
                   .pipe(gulp.dest('./build'));
});

gulp.task('cname', function () {
  gulp.src('CNAME').pipe(gulp.dest('./build'));
});
gulp.task('styles', function(){
  gulp.src('./less/*.less')
      .pipe(less())
      .pipe(gulp.dest('./build/css'));
});

gulp.task('icons', function(){
  gulp.src('./icons/*')
                   .pipe(gulp.dest('./build'));
});

gulp.task('photos', function(){
  gulp.src('./photos/*')
                   .pipe(gulp.dest('./build'));
});

gulp.task('backgrounds', function(){
  gulp.src('./backgrounds/*')
                   .pipe(gulp.dest('./build'));
});

gulp.task('docs', function(){
  gulp.src('./docs/*')
      .pipe(gulp.dest('./build/docs'));
});

gulp.task('watch', function(){
  gulp.watch('./src/*.jade', ['render-jade']);
  gulp.watch('./sass/*.sass', ['styles']);
  connect().use(connect.static(__dirname+'/build')).listen(8080);
  console.log('Site available at localhost:8080');
});
