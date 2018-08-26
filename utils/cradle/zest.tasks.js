import createStylelintTask from './tasks/stylelint';
import createCleanTask from './tasks/clean';
import createCopyTask from './tasks/copy';
import createCssLocalTask from './tasks/css';
import createInlineCssTask from './tasks/inlineCss';
import {createStyleInjectTask, createExtraStyleInjectTask} from './tasks/styleInject';

import paths from '../config/paths.config';

export const zest = {
    tasks: {}
};

zest.tasks.stylelint = createStylelintTask({
    src: paths.src.ui.sass.all
});

zest.tasks.clean = createCleanTask({
    target: [paths.dist.root]
});

zest.tasks.removeTemp = createCleanTask({
    target: [paths.temp.root]
});

zest.tasks.copy = createCopyTask({
    src: [paths.src.ui.img],
    dest: paths.dist.img
});

zest.tasks.cssLocal = createCssLocalTask({
    src: paths.src.ui.sass.entry,
    dest: paths.dist.css.root
});

zest.tasks.styleInject = createStyleInjectTask({
    src: paths.src.view.entry,
    dest: paths.temp.view.root
});

zest.tasks.extraStyleInject = createExtraStyleInjectTask({
    src: paths.dist.view.entry,
    dest: './',
    styles: paths.dist.css.extra 
});

zest.tasks.inlineCss = createInlineCssTask({
    src: paths.temp.view.entry,
    dest: paths.dist.view.root,
    options: {
        applyLinkTags: true,
        applyStyleTags: true,
        applyTableAttributes: true,
        applyWidthAttributes: true,
        codeBlocks: {},
        extraCss: '',
        preserveMediaQueries: true,
        removeLinkTags: true,
        removeHtmlSelectors: false,
        removeStyleTags: true,
        url: ''
    }
});