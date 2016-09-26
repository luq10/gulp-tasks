const _ = require('lodash');
const fs = require('fs');

module.exports = class GulpTasks {
  /**
   * @param gulp
   * @param {Object} [config]
   * @param {Object} [config.paths]
   * @param {String} [config.paths.src='src']
   * @param {String} [config.paths.dest='dest']
   * @param {Function} [config.onError]
   * @param {Object} [moduleConfigs]
   */
  constructor(gulp, config, moduleConfigs){
    this.gulp = gulp;
    this.config = _.defaultsDeep(config, {
      paths: {
        src:  'src',
        dest: 'dest',
        tmp:  '.tmp'
      },
      onError: (title) => {
        return (err) =>  {
          console.log('[' + title + ']', err.toString());
          this.emit('end');
        };
      }
    });
    this.moduleConfigs = moduleConfigs || {};

    this._init();

    return this.gulp;
  }

  /**
   * Initialize
   *
   * @private
   */
  _init(){
    let modules = this._getModules();

    this._requireModules(modules);
    this._registerDefault();
  }

  /**
   * Get all module files
   * @returns {Array}
   * @private
   */
  _getModules(){
    return fs.readdirSync(__dirname + '/modules');
  }

  /**
   * Require modules files
   * @param {Array} modules
   */
  _requireModules(modules){
    modules.map((file) => {
      let filename = file.substring(0, file.lastIndexOf('.'));
      let moduleConfig = this.moduleConfigs[filename] || {};

      require(__dirname + '/modules/' + file)(this.gulp, this.config, moduleConfig);
    });
  }

  /**
   * Register default gulp task
   */
  _registerDefault(){
    this.gulp.task('default', ['build:dist']);
  }
};

