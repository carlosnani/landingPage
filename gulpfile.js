// Adiciona os modulos instalados
const gulp = require('gulp'); 
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

// Função para compilar o SASS e adicionar os prefixos
function compilaSass() {
  return gulp
  .src('scss/*.scss')
  .pipe(sass({
    outputStyle: 'compressed',
    // outputStyle: 'expanded'
  }))
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(gulp.dest('dist/css'))
  .pipe(browserSync.stream());
}

// Tarefa de gulp para a função de SASS
gulp.task('sass', function(done){
  compilaSass();
  done();
});

// Função para juntar o JS
function gulpJS() {
  return gulp
  .src('js/*.js')
  .pipe(concat('app.js'))
  .pipe(babel({
    presets: ['env']
  }))
  .pipe(uglify())
  .pipe(gulp.dest('dist/js'))
  .pipe(browserSync.stream())
}

gulp.task('mainjs', gulpJS);

// Função para iniciar o browser
function browser() {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
}

// Tarefa para iniciar o browser-sync
gulp.task('browser-sync', browser);

// Função de watch do Gulp
function watch() {
  gulp.watch('scss/*.scss', compilaSass);
  gulp.watch('js/*.js', gulpJS);
  // gulp.watch('js/plugins/*.js', pluginJS);
  gulp.watch(['dist/*.html']).on('change', browserSync.reload);
}

// Inicia a tarefa de watch
gulp.task('watch', watch);

// Tarefa padrão do Gulp, que inicia o watch e o browser-sync
gulp.task('default', gulp.parallel('watch', 'browser-sync', 'sass', 'mainjs'));