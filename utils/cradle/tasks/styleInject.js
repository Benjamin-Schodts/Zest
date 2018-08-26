import gulp from 'gulp';
import gulpStyleInject from 'gulp-style-inject';

export function createStyleInjectTask({src = undefined, dest = undefined}) {
    return function styleInject() {
        return gulp.src(src)
            .pipe(gulpStyleInject())
            .pipe(gulp.dest(dest));
    };
}

