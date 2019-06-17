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

mix.webpackConfig({
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            '@': __dirname + 'resources'
        }
    }
});

// webpack.mix.js
mix.setPublicPath('public');
mix.webpackConfig({
    output: {
        chunkFilename: 'js/chunks/[name].js',
    },
});


// used to run app using vuejs
mix.js('resources/lms/src/index.js', 'public/js/app.js');
