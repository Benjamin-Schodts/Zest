import gulp from 'gulp';

import {zest} from './utils/cradle/zest.tasks';
import {translate} from './utils/scribe/scribe.tasks';
import {buildOnChange, testOnChange} from './utils/cradle/common.tasks';

const analyzeZest = gulp.series(
    zest.tasks.stylelint
);

const buildZest = gulp.series(
    zest.tasks.clean,
    zest.tasks.copy,
    zest.tasks.cssLocal,
    zest.tasks.styleInject,
    zest.tasks.inlineCss
);

const startScribe = gulp.series(
    translate  
);

const cleanUp = gulp.series(
    zest.tasks.removeTemp
)

const startZest = gulp.series(
    analyzeZest,
    buildZest,
    startScribe,
    cleanUp,
    buildOnChange,
    testOnChange
);

export {
    startZest
}