var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        'polyfills': './app/polyfills.ts',
        'vendor': './app/vendor.ts',
        'app': './app/main.ts'
    },

    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },

    resolve: {
        extensions: ['.ts', '.js']
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: { configFileName: path.join(__dirname, 'app', 'tsconfig.json') }
                    }, 'angular2-template-loader'
                ]
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=assets/[name].[hash].[ext]'
            },
            {
                test: /\.css$/,
                // exclude: path.join(__dirname, 'app'),
                use: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader?sourceMap' })
            }
            // {
            //     test: /\.css$/,
            //     include: path.join(__dirname, 'app'),
            //     loader: 'raw-loader'
            // }
        ]
    },
    plugins: [
        //It moves all the required *.css modules in entry chunks into a separate CSS file. 
        //So your styles are no longer inlined into the JS bundle, but in a separate CSS file (styles.css). 
        new ExtractTextPlugin('[name].css'),
        // Workaround for angular/angular#11580
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)@angular/,
            path.join(__dirname, 'app'), // location of your app
            {} // a map of your routes
        ),
        //The CommonsChunkPlugin is an opt-in feature that creates a separate file (known as a chunk), consisting of common modules shared between multiple entry points. 
        //By separating common modules from bundles, the resulting chunked file can be loaded once initially, and stored in cache for later use.
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),
        // This is a webpack plugin that simplifies creation of HTML files to serve your webpack bundles. 
        // This is especially useful for webpack bundles that include a hash in the filename which changes every compilation. 
        // You can either let the plugin generate an HTML file for you, supply your own template using lodash templates or use your own loader.
        new HtmlWebpackPlugin({
            template: 'index.html'
        })
    ]
};