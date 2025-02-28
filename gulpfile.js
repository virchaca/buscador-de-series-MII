const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

// Compilar archivos SCSS a CSS
gulp.task('sass', function() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream());
});

// Servir y observar cambios en archivos SCSS/HTML
gulp.task('serve', function() {
  browserSync.init({
    server: './'
  });

  gulp.watch('src/scss/**/*.scss', gulp.series('sass'));
  gulp.watch('*.html').on('change', browserSync.reload);
});

// Tarea por defecto
gulp.task('default', gulp.series('sass', 'serve'));