const webpack = require('webpack');
const path = require('path');
const dotenv = require('dotenv').config({path: path.join(__dirname, '.env')});

module.exports = {
    entry: {
        app: './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    devServer: {
        contentBase: './',
        historyApiFallback: true,
        port: 8081,
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.scss$/,
                loader: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(dotenv.parsed),
        }),
    ],
};
