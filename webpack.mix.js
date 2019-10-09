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
mix.js('resources/assets/js/lending.js', 'public/js/lending.js').version();
mix.js('resources/assets/js/home.js', 'public/js/home.js').version();
mix.styles([
    'resources/assets/css/noid-font-style.css',
], 'public/css/app.css').version();
mix.copy('resources/assets/fonts', 'public/fonts');
mix.copy('resources/assets/banners', 'public/images/banner');
mix.copy('resources/assets/img', 'public/img');
