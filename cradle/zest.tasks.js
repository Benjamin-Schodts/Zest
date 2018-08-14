import createStylelintTask from './tasks/stylelint';
import createCleanTask from './tasks/clean';
import createCopyTask from './tasks/copy';
import createCssLocalTask from './tasks/css';
import createServerTask from './tasks/server';

import paths from './config/paths.config';

export const zest = {
    tasks: {}
};

zest.tasks.stylelint = createStylelintTask({
    src: paths.src.ui.sass.all
});

zest.tasks.clean = createCleanTask({
    target: [paths.dist.root]
});

zest.tasks.copy = createCopyTask({
    src: [paths.src.ui.img],
    dest: paths.dist.img
});

zest.tasks.cssLocal = createCssLocalTask({
    src: paths.src.ui.sass.entry,
    dest: paths.dist.css
});

zest.tasks.server = createServerTask({
    config: {
        ui: false,
        ghostMode: false,
        files: [
            paths.dist.css.all,
            paths.dist.img
        ],
        open: false,
        reloadOnRestart: true,
        proxy: {
            target: paths.dev_url
        },
        https: {
            key: '.skylab/conf/ssl/dev/star_dev_kunstmaan_be.key',
            cert: '.skylab/conf/ssl/dev/star_dev_kunstmaan_be.crt'
        },
        notify: true
    }
});
