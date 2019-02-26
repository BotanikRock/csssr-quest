const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const webpack = require('webpack-stream');
const sass = require('gulp-sass');
const concatCss = require('gulp-concat-css');
const postCss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

sass.compiler = require('node-sass');

const mode = process.env.NODE_ENV;

const _webpackConfig = require('./webpack.config');
const webpackConfig = {..._webpackConfig, mode};

const srcRoot = './src/';
const distRoot = './dist/';

const paths = {
  src: {
    scriptEntry: `${srcRoot}script/index.js`,
    script: `${srcRoot}script/`,
    html: `${srcRoot}index.html`,
    style: [
      `${srcRoot}style/vendors/**/*.sass`,
      `${srcRoot}style/helpers/**/*.sass`,
      `${srcRoot}style/blocks/**/*.sass`,
      `${srcRoot}style/pages/**/*.sass`,
    ],
  },
};


const html = () => {
  return gulp.src(paths.src.html)
      .pipe(gulp.dest(distRoot));
};

const postCssPluginDev = [
  autoprefixer({browsers: ['cover 99.5%']}),
];

const postCssPluginProd = [
  ...postCssPluginDev,
  cssnano(),
];

const style = () => {
  return gulp.src(paths.src.style)
      .pipe(sass().on('error', sass.logError))
      .pipe(concatCss('style.css'))
      .pipe(postCss(mode === 'development' ? postCssPluginDev : postCssPluginProd))
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

const watch = () => {
  gulp.watch(paths.src.html, html);
  gulp.watch(paths.src.style, style);
  gulp.watch(paths.src.script, script);
};

const server = () => {
  browserSync.init({
    server: {
      baseDir: distRoot,
    },
  });

  gulp.watch(distRoot, reload);
  watch();
};


const tasks = [html, style, script];


exports['dev:server'] = gulp.series(...tasks, server);
exports['prod:build'] = gulp.series(...tasks);
