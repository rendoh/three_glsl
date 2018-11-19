require('browser-sync')({
  server: {
    baseDir: './dist',
  },
  files: ['./dist/**/*'],
});