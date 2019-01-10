'use strict'

const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const HOST = 'localhost'
const PORT = 3030
const localServerUrlForPatientsMicroService = "http://localhost:3555";

module.exports = merge(baseConfig, {
    mode: 'development',

    devServer: {
        clientLogLevel: 'warning',
        hot: true,
        contentBase: 'dist',
        compress: true,
        host: HOST,
        port: PORT,
        open: true,
        overlay: {warnings: false, errors: true},
        publicPath: '/',
        quiet: true,
        proxy: {
            // proxy all requests starting with /api to jsonplaceholder
            '/api/patients': {
                target: localServerUrlForPatientsMicroService,
                changeOrigin: true,
                pathRewrite: {
                    '^/api/patients': ''
                }
            }
        },
        watchOptions: {
            poll: true
        }
    },

        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        'vue-style-loader',
                        'css-loader'
                    ]
                }, {
                    test: /\.styl(us)?$/,
                    use: [
                        'vue-style-loader',
                        'css-loader',
                        'stylus-loader'
                    ]
                }
            ]
        },

        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    })
