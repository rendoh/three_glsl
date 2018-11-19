const task = require('gulp').task;
const watch = require('gulp').watch;
const parallel = require('gulp').parallel;
const series = require('gulp').series;
const sass = require('./sass');
const copy = require('./copy');
const ejs = require('./ejs');
const edge = require('./edge');
const image = require('./image');

task('build', series(
  parallel(
    sass.compile,
    copy.copy,
    ejs.compile,
    edge.compile,
  ),
  image.optimize,
));

task('default', () => {
  function compileSassDev(done) {
    sass.compile(false);
    done();
  }
  compileSassDev.displayName = sass.compile.displayName;
  watch(sass.path, compileSassDev);
  watch(copy.path, copy.copy);
  watch(ejs.path, ejs.compile);
  watch(edge.path, edge.compile);
});
