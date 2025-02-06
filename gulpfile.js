import gulp from 'gulp';
import sass from 'sass';
import gulpSass from 'gulp-sass';
import imagemin from 'gulp-imagemin';
import uglify from 'gulp-uglify';

export function compilaSass() {
    return gulp.src('./source/styles/main.scss')
        .pipe(gulp.dest('./build/styles'));
}

export function comprimeImagens() {
    return gulp.src('./source/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/images'))
}

export function comprimeJavaScript() {
    return gulp.src('./source/scripts/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./build/scripts'))
}

function watchFiles() {
    gulp.watch('./source/styles/*.scss', { ignoreInitial: false }, gulp.series(compilaSass));
    gulp.watch('./source/scripts/*.js', { ignoreInitial: false }, gulp.series(comprimeJavaScript));
    gulp.watch('./source/images/*', { ignoreInitial: false }, gulp.series(comprimeImagens));
}
export default gulp.series(
    gulp.parallel(compilaSass, comprimeJavaScript, comprimeImagens),
    watchFiles
);