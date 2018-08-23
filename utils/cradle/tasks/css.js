import gulp from 'gulp';
import sass from 'gulp-sass';
import notifier from 'node-notifier';
import sourcemaps from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';

export default function createCssLocalTask({src = undefined, dest = undefined}) {
    return function cssLocal() {
        return gulp.src(src)
            .pipe(sourcemaps.init())
            .pipe(sass().on('error', sassErrorHandler))
            .pipe(postcss([autoprefixer()]))
            .pipe(gulp.dest(dest));
    };
}

function sassErrorHandler(error) {
    console.log(`Sass Error:\n${error.messageFormatted}`);
    notifier.notify({
        title: 'Sass',
        message: `Error in ${error.relativePath} at L${error.line}:C${error.column}`
    });
    this.emit('end');
}
