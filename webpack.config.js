const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin'); // подключили плагин
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
const WebpackMd5Hash = require('webpack-md5-hash');
const webpack = require('webpack');

 


module.exports = {
    entry: { main: './src/index.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/i,
                use: [
                                (isDev ? 'style-loader' : MiniCssExtractPlugin.loader),
                                'css-loader', 
                                'postcss-loader'
                        ]
            },
            {
                test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: {
                    loader: 'file-loader',
                },
            },
            {
                test: /\.(png|jpg|gif|ico|svg)$/,
                use: [
                        'file-loader?name=./images/[name].[ext]', // указали папку, куда складывать изображения
                        {
                                loader: 'image-webpack-loader',
                                options: {}
                        },
                ]
            },
            {
                test: /\.(eot|ttf|otf|woff|woff2)$/,
                loader: 'file-loader?name=./vendor/[name].[ext]',
            },

        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'index.[contenthash].css'
        }),
        new HtmlWebpackPlugin({ // настроили плагин
            template: './src/index.html',
            filename: 'index.html'
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                    preset: ['default'],
            },
            canPrint: true
        }),
        new WebpackMd5Hash(),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }) 
        
        
    ]
};


    