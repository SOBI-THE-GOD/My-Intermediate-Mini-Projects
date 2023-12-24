const gulp = require("gulp");
const scssCompiler = require("gulp-sass")(require("sass"));
const postCSS = require("gulp-postcss");
const cssNano = require("cssnano");
const autoPrefixer = require("autoprefixer");

// pathes :
const pathes = { css: "css", scss: "scss/**/*.scss" };

// tasks functions :
function styleCompiler() {
    return gulp
        .src(pathes.scss)
        .pipe(scssCompiler())
        .pipe(postCSS([autoPrefixer(), cssNano()]))
        .pipe(gulp.dest(pathes.css));
}

// watcher :
function watcher() {
    gulp.watch(pathes.scss, gulp.parallel(styleCompiler));
}

// executer command
exports.default = gulp.series(styleCompiler, watcher);
