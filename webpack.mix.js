const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
  .js('resources/js/app.js', 'public/js')
  .js('resources/js/general.js', 'public/js')
  .js('resources/js/gallery.js', 'public/js')
  .js('resources/js/basket.js', 'public/js')
  .sass('resources/sass/welcome.scss', 'public/css')
  .sass('resources/sass/bigbuttons.scss', 'public/css')
  .sass('resources/sass/personal.scss', 'public/css')
  .sass('resources/sass/login.scss', 'public/css')
  .sass('resources/sass/gallery.scss', 'public/css')
  .sass('resources/sass/supermodal.scss', 'public/css')
  .sass('resources/sass/basket.scss', 'public/css')
  .sass('resources/sass/app.scss', 'public/css');
