var gulp = require('gulp'),
    rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin')
var cleancss = require('gulp-clean-css');


var purify = require('gulp-purifycss');
var critical = require('critical');
var htmlmin = require('gulp-htmlmin');

gulp.task('default', ['styles', 'scripts', 'images', 'copy']);

gulp.task('styles', function(){
    gulp.src(['src/assets/css/**/*.css'])
        .pipe(purify(['./src/assets/js/**/*.js', './src/**/*.html']))
        .pipe(cleancss())
        .pipe(gulp.dest('dist/assets/css/'))
});

gulp.task('scripts', function(){
    return gulp.src('src/assets/js/**/*.js')
        .pipe(gulp.dest('dist/assets/js/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js/'))
});

gulp.task('images', function(){
    gulp.src('src/assets/img/**/*')
        .pipe((imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest('dist/assets/img/'));
});

gulp.task('copy', function() {
    console.log("Copying src to dist");
    gulp.src("./src/**.*")
        .pipe(gulp.dest('./dist/'));
    gulp.src("./src/assets/fonts/**.*")
        .pipe(gulp.dest('./dist/assets/fonts/'));
    gulp.src("./src/assets/vid/**.*")
        .pipe(gulp.dest('./dist/assets/vid/'));
    gulp.src("./src/assets/**.*")
        .pipe(gulp.dest('./dist/assets/'));
});

// Generate & Inline Critical-path CSS
gulp.task('critical', function () {
    critical.generate({
        inline: true,
        base: 'dist/',
        src: 'index.html',
        dest: 'index.html',
        width: 320,
        height: 1920,
        minify: true
    });
});

gulp.task('html', function() {
    return gulp.src('dist/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            removeComments: true,
            minifyJS: true,
            minifyCSS: true,
            decodeEntities: true,
        }))
        .pipe(gulp.dest('dist'));
});