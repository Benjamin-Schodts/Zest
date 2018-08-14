// require('babel-register')({
//     presets: [ 'env' ]
// })


import gulp from 'gulp';

import {zest} from './cradle/zest.tasks';
import {buildOnChange, testOnChange} from './cradle/common.tasks'

const analyzeZest = gulp.series(
    zest.tasks.stylelint
);

const buildZest = gulp.series(
    zest.tasks.clean,
    zest.tasks.copy,
    zest.tasks.cssLocal
);

const startZestServer = gulp.series(
    zest.tasks.server  
);

const startZest = gulp.series(
    analyzeZest,
    buildZest,
    startZestServer,
    buildOnChange,
    testOnChange
);

export {
    startZest
}