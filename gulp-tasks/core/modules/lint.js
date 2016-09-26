const eslint = require('gulp-eslint');
const gulpIf = require('gulp-if');

/**
 *
 * @param {Object} gulp
 * @param {Object} config
 * @param {Object} [moduleConfig]
 */
module.exports = (gulp, config, moduleConfig) => {
  moduleConfig = _.defaultsDeep(moduleConfig, {});

  var isFixed = (file) => {
    // Has ESLint fixed the file contents?
    return (file.eslint !== null && file.eslint.fixed);
  };

  gulp.task('lint', () => {
    return gulp.src(config.paths.src + '/js/**/*.js')
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
  });

  gulp.task('lint:fix', () => {
    return gulp.src(config.paths.src + '/js/**/*.js')
      .pipe(eslint({
        fix: true
      }))
      .pipe(eslint.format())
      .pipe(gulpIf(isFixed, gulp.dest(config.paths.src + '/js')));
  });
};
