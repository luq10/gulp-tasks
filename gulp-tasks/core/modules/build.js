const _ = require('lodash');
const runSequence = require('run-sequence');

/**
 *
 * @param {Object} gulp
 * @param {Object} config
 * @param {Object} [moduleConfig]
 */
module.exports = (gulp, config, moduleConfig) => {
  moduleConfig = _.defaultsDeep(moduleConfig, {});

  gulp.task('build', (done) => {
    runSequence(
      ['build:dist'],
      done
    );
  });

  gulp.task('build:tmp', (done) => {
    runSequence(
      ['lint'],
      ['styles', 'images'],
      done
    );
  });

  gulp.task('build:dist', ['lint'], () => {
    console.log('build:dist', config);
  });
};
