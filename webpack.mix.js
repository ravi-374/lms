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

mix.options({
    postCss: [
        require('autoprefixer'),
    ],
});
mix.setPublicPath('public');
mix.webpackConfig({
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            '@': __dirname + 'resources'
        }
    },
    output: {
        chunkFilename: 'js/chunks/[name].js',
    },
});
module.exports = {
    //...
    optimization: {
        concatenateModules: true
    }
};

// used to run app using reactjs
mix.js('resources/lms/src/index.js', 'public/js/app.js').version();
mix.styles([
    'resources/assets/css/font-awesome-5.11.2.css',
    'resources/assets/css/bootstrap.min.css',
    'resources/assets/css/bootstrap.min.css',
], 'public/css/app.css').version();
mix.copy('resources/assets/webfonts', 'public/webfonts');
mix.babel('resources/assets/js/jquery.min.1.11.3.js', 'public/js/jquery.min.1.11.3.js');
mix.babel('resources/assets/js/redoc.standalone.js', 'public/js/redoc.standalone.js');
mix.copy('resources/assets/img', 'public/img');
mix.babel('public/js/app.js', 'public/js/app.js').version();
