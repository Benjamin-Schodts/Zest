import gulp from 'gulp';
import gulpInlineCss from 'gulp-inline-css';

export default function createInlineCssTask({src = undefined, dest = undefined, options = {}}) {
    return function inlineCss() {
        return gulp.src(src)
            .pipe(gulpInlineCss(options))
            .pipe(gulp.dest(dest));
    };
}
