const gulp = require("gulp");
const sassCompiler = require("gulp-sass")(require("sass"));
const postCSS = require("gulp-postcss");
const cssNano = require("cssnano");
const autoPrefixer = require("autoprefixer");
const {
    style,
} = require("../intermediate-mini-projects/changing-brightness-slider-mini-project/gulpfile");

// pathes
const filesPath = { css: "css", scss: "scss/**/*.scss" };

// tasks functions

function styleCompileHandler() {
    return (
        gulp
            .src(filesPath.scss)
            .pipe(sassCompiler())
            .pipe(postCSS([autoPrefixer()]))
            // .pipe(postCSS([cssNano(), autoPrefixer()]))
            .pipe(gulp.dest(filesPath.css))
    );
}

// watcher function
function watcher() {
    gulp.watch(filesPath.scss, gulp.parallel(styleCompileHandler));
}
// gulp command

exports.default = gulp.series(styleCompileHandler, watcher);
