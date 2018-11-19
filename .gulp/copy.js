const src = require('gulp').src;
const dest = require('gulp').dest;

const path = [
  '../src/**/*.!(scss|js|ejs|ts|edge)',
];

const copy = () => src(path).pipe(dest('../dist'));
copy.displayName = 'copy static files';

exports.path = path;

exports.copy = copy;
