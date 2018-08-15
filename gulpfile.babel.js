/* eslint-env node */

import gulp from 'gulp';

import {zest} from './cradle/zest.tasks';
import {buildOnChange, testOnChange} from './cradle/common.tasks'

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

const startZest = gulp.series(
    analyzeZest,
    buildZest,
    buildOnChange,
    testOnChange
);

export {
    startZest
}