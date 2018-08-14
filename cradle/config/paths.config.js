module.exports = {
    src: {
        ui: {
            sass: {
                root: './src/ui/scss/',
                all: './src/ui/scss/**/*.scss',
                entry: './src/ui/scss/*.scss'
            },
            img: './src/ui/img/**'
        }
    },
    dist: {
        root: './dist/',
        css: './dist/css/',
        img: './dist/img/'
    }
};
