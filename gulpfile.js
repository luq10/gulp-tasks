let gulp = require('gulp');
const GulpTasks = require('./gulp-tasks/core');

gulp = new GulpTasks(gulp, {
  // config...
}, {
  // styles: {
  //   autoprefixer: {
  //     browsers: ['last 2 versions', 'ie 8', 'ie 9', '> 1%']
  //   }
  // }
});

// Overwrite build:tmp task
// - remove lint
// const runSequence = require('run-sequence');
//
// gulp.task('build:tmp', function(done){
//   runSequence(
//     ['styles', 'images'],
//     done
//   );
// });
