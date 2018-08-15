import gulp from 'gulp';
import paths from './config/paths.config';
import {zest} from './zest.tasks';

export function buildOnChange(done) {
    // CSSLOCAL
    gulp.watch(paths.src.ui.img, zest.tasks.copy);
    gulp.watch([paths.src.ui.sass.all, paths.src.view.all], 
        gulp.series(zest.tasks.cssLocal, zest.tasks.styleInject, zest.tasks.inlineCss)
    );
    done();
}
export function testOnChange(done) {
    // STYLELINT
    gulp.watch(paths.src.ui.sass.all, zest.tasks.stylelint);
    done();
}