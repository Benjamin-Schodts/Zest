import gulp from 'gulp';
import paths from './config/paths.config';
import {zest} from './zest.tasks';

export function buildOnChange(done) {
    // CSSLOCAL
    gulp.watch(paths.src.ui.sass.all, zest.tasks.cssLocal);
    done();
}
export function testOnChange(done) {
    // STYLELINT
    gulp.watch(paths.src.ui.sass.all, zest.tasks.stylelint);
    done();
}