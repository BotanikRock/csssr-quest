const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const webpack = require('webpack-stream');
const sass = require('gulp-sass');
const concatCss = require('gulp-concat-css');

sass.compiler = require('node-sass');

const mode = process.env.NODE_ENV;

const _webpackConfig = require('./webpack.config');
const webpackConfig = {..._webpackConfig, mode};

const srcRoot = './src/';
const distRoot = './dist/';

const paths = {
  src: {
    scriptEntry: `${srcRoot}script/app.js`,
    script: `${srcRoot}script/`,
    html: `${srcRoot}index.html`,
    styleDir: `${srcRoot}style/`,
    style: `${srcRoot}style/**/*.sass`,
  },
};


const html = () => {
  return gulp.src(paths.src.html)
      .pipe(gulp.dest(distRoot));
};

const style = () => {
  return gulp.src(paths.src.style)
      .pipe(sass().on('error', sass.logError))
      .pipe(concatCss('style.css'))
      .pipe(gulp.dest(distRoot));
};

const script = () => {
  return gulp.src(paths.src.scriptEntry)
      .pipe(webpack(webpackConfig))
      .pipe(gulp.dest(distRoot));
};


const reload = (done) => {
  browserSync.reload();
  done();
};

const server = () => {
  browserSync.init({
    server: {
      baseDir: distRoot,
    },
  });

  gulp.watch(distRoot, reload);
};

const watch = () => {
  gulp.watch(paths.src.html, html);
  gulp.watch(paths.src.styleDir, style);
  gulp.watch(paths.src.script, script);
};


const tasks = [html, style, script];


exports['dev:server'] = gulp.series(...tasks, server, watch);
exports['prod:build'] = gulp.series(...tasks);
