module.exports = {
    src: {
        ui: {
            sass: {
                root: './src/ui/scss/',
                all: './src/ui/scss/**/*.scss',
                entry: './src/ui/scss/*.scss'
            },
            img: './src/ui/img/**'
        },
        view: {
            root: './src/view/',
            entry: './src/view/*.html',
            all: './src/view/**/*.html'
        }
    },
    dist: {
        root: './dist/',
        css: './dist/css/',
        img: './dist/img/',
        view: './dist/view/'
    },
    temp: {
        root: './temp/',
        view: {
            root: './temp/view',
            entry: './temp/view/*.html',
            all: './temp/view/**/*.html'
        }
    }
};
