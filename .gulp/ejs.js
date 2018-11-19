const src = require('gulp').src;
const dest = require('gulp').dest;
const ejs = require('gulp-ejs');
const plumber = require('gulp-plumber');
const htmlhint = require('gulp-htmlhint');
const prettify = require('gulp-prettify');

const path = '../src/**/*.ejs';

const compile = () => src('../src/**/!(_)*.ejs')
  .pipe(plumber())
  .pipe(ejs({}, {
    _with: false,
    localsName: 'props',
  }, { ext: '.html' }))
  .pipe(prettify({
    unformatted: ['br'],
  }))
  .pipe(htmlhint())
  .pipe(htmlhint.reporter())
  .pipe(dest('../dist'));
compile.displayName = 'compile ejs';

exports.path = path;
exports.compile = compile;
