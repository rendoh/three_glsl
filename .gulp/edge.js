const src = require('gulp').src;
const dest = require('gulp').dest;
const edge = require('gulp-edgejs');
const htmlhint = require('gulp-htmlhint');
const prettify = require('gulp-prettify');

const path = '../src/**/*.edge';

const compile = () => src('../src/**/!(_)*.edge')
  .pipe(edge())
  .pipe(prettify({
    unformatted: ['br'],
  }))
  .pipe(htmlhint())
  .pipe(htmlhint.reporter())
  .pipe(dest('../dist'));
compile.displayName = 'compile edge';

exports.path = path;
exports.compile = compile;
