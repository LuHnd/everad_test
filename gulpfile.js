const gulp = require("gulp");
const postcss = require("gulp-postcss");
const concat = require("gulp-concat");
const autoprefixer = require("autoprefixer");
const plumber = require("gulp-plumber");
const imagemin = require('gulp-imagemin');
const cssnano = require("cssnano");
const htmlmin = require("gulp-htmlmin");
const sass = require("gulp-sass");
const rename = require("gulp-rename");
const browsersync = require("browser-sync").create();

function scss(cb) {
    gulp
        .src("./src/**/*.scss")
        .pipe(sass({ outputStyle: "expanded" }))
        .pipe(gulp.dest("./build/"))
        .pipe(rename({ suffix: ".min" }))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(gulp.dest("./build/"))
        .pipe(browsersync.stream());
    cb();
}

function img(cb) {
    gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/img'))
        .pipe(browsersync.stream());
    cb();
}

function html(cb) {
    gulp
        .src("./src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("./build/"))
        .pipe(browsersync.stream());
    cb();
}


exports.default = function() {
    browsersync.init({
        server: {
            baseDir: "./build/",
        },
    });
    gulp.watch("src/**", gulp.series(scss, html, img));
};