const _ = require('lodash');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

/**
 *
 * @param {Object} gulp
 * @param {Object} config
 * @param {Object} [moduleConfig]
 * @param {Object} [moduleConfig.autoprefixer]
 * @param {Array} [moduleConfig.autoprefixer.browsers=['last 2 versions']]
 */
module.exports = (gulp, config, moduleConfig) => {
  moduleConfig = _.defaultsDeep(moduleConfig, {
    autoprefixer: {
      browsers: ['last 2 versions']
    }
  });

  gulp.task('styles', (done) => {
    runSequence(
      ['styles:compile:sass'],
      ['styles:autoprefixer'],
      done
    );
  });

  gulp.task('styles:compile:sass', () => {
    return gulp.src(config.paths.src + '/assets/styles/styles.scss')
      .pipe(sass({outputStyle: 'expanded'})
        .on('error', config.onError('Sass')))
      .pipe(gulp.dest(config.paths.tmp + '/assets/styles'));
  });

  gulp.task('styles:autoprefixer', () => {
    return gulp.src(config.paths.tmp + '/assets/styles/*.css')
      .pipe(autoprefixer(moduleConfig.autoprefixer))
      .pipe(gulp.dest(config.paths.tmp + '/assets/styles/'));
  });
};
