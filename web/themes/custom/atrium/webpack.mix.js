/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your application. See https://github.com/JeffreyWay/laravel-mix.
 |
 */
const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Configuration
 |--------------------------------------------------------------------------
 */
mix.setPublicPath('assets').disableNotifications();

/*
 |--------------------------------------------------------------------------
 | Browsersync
 |--------------------------------------------------------------------------
 */

// Note: To customize the proxy, see docs in README.md.
mix.browserSync({
  proxy: process.env.MIX_PROXY ? process.env.MIX_PROXY : 'https://jcc.lndo.site',
  files: ['assets/js/**/*.js', 'assets/css/**/*.css'],
  stream: true,
  watch: true
});

/*
 |--------------------------------------------------------------------------
 | SASS
 |--------------------------------------------------------------------------
 */

// Node Sass Options: https://github.com/sass/node-sass#options
const nodeSassOptions = {
  includePaths: ['node_modules', '../../../libraries']
};

mix
  .sass('src/sass/atrium.style.scss', 'css', nodeSassOptions)
  .options({
    processCssUrls: false,
    autoprefixer: {
      enabled: true,
      options: {
        grid: true,
        overrideBrowserslist: ['last 2 versions', '>= 1%', 'ie >= 11']
      }
    }
  }
);

/*
 |--------------------------------------------------------------------------
 | JS
 |--------------------------------------------------------------------------
 */
mix
  .js('src/js/atrium.script.js', 'js')
  .js('src/js/howtotabs.js', 'js');
