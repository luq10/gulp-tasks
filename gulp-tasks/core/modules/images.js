const _ = require('lodash');
const runSequence = require('run-sequence');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');

/**
 *
 * @param {Object} gulp
 * @param {Object} config
 * @param {Object} [moduleConfig]
 */
module.exports = (gulp, config, moduleConfig) => {
  moduleConfig = _.defaultsDeep(moduleConfig, {});

  gulp.task('images', (done) => {
    runSequence(
      ['images:copy'],
      done
    );
  });

  gulp.task('images:copy', () => {
    return gulp.src(config.paths.src + '/assets/images/**/*')
      .pipe(gulp.dest(config.paths.tmp + '/assets/images'));
  });

  gulp.task('images:min', () => {
    return gulp.src(config.paths.src + '/assets/images/**/*')
      .pipe(imagemin({
        progressive: true,
        use: [pngquant()],
        verbose: true
      }))
      .pipe(gulp.dest(config.paths.src + '/assets/images'));
  });
};
