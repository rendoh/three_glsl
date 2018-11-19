const src = require('gulp').src;
const dest = require('gulp').dest;
const imagemin = require('gulp-imagemin');

const optimize = () => src('../dist/**/*.+(png|jpg|jpeg|svg|gif)')
  .pipe(imagemin([
    imagemin.gifsicle({ interlaced: true, optimizationLevel: 1 }),
    imagemin.jpegtran(),
    imagemin.optipng({ optimizationLevel: 5 }),
    imagemin.svgo({
      plugins: [
        { removeViewBox: true },
      ],
    }),
  ]))
  .pipe(dest('../dist'));
optimize.displayName = 'optimize images';

exports.optimize = optimize;
