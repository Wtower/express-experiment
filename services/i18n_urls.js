/**
 * i18n middleware
 * Include after static
 * @type {{init: module.exports.init, url: module.exports.url}}
 */

module.exports = {
  /**
   * Configure i18n-node and keep settings in locals
   * @param app
   * @param i18n
   * @param config
   */
  configure: function(app, i18n, config) {
    app.locals.i18n = config;
    i18n.configure(config);
  },

  /**
   * Set language from url
   * @param req
   * @param res
   * @param next
   */
  init: function(req, res, next) {
    var rxLocale = /^\/(\w\w)/i;
    if (rxLocale.test(req.url)){
      var locale = rxLocale.exec(req.url)[1];
      if (req.app.locals.i18n.locales.indexOf(locale) >= 0)
        req.setLocale(locale);
    }
    //else // no need to set the already default
    // @todo check from cookie
    next();
  },

  /**
   * Return an array of urls with each locale for use with routes
   * @param app
   * @param url
   * @returns {Array}
   */
  url: function(app, url) {
    var locales = app.locals.i18n.locales;
    var urls = [];
    for (var i = 0; i < locales.length; i++)
      urls[i] = '/' + locales[i] + url;
    urls[i] = url;
    return urls;
  }
};
