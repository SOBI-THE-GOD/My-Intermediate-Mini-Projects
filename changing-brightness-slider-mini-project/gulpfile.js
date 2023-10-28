const gulp = require("gulp");
const sassCompiler = require("gulp-sass")(require("sass"));
const postCSS = require("gulp-postcss");
const cssNano = require("cssnano");
const autoPrefixer = require("autoprefixer");
// files path
const pathes = {
    css: "css",
    scss: "scss/**/*.scss",
};
// tasks
function style() {
    return gulp
        .src(pathes.scss)
        .pipe(sassCompiler())
        .pipe(postCSS([autoPrefixer(), cssNano()]))
        .pipe(gulp.dest(pathes.css));
}
// gulp watch
function watch() {
    gulp.watch(pathes.scss, gulp.parallel(style));
}
// gulp commands
exports.style = gulp.series(style, watch);
