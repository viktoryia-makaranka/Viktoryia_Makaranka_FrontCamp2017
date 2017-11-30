const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractLess = new ExtractTextPlugin({
    filename: 'styles.css'
});

module.exports = {
    entry: [
        './src/js/index.js',
        'babel-polyfill',
        'fetch-polyfill'
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'docs')
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: [/node_modules/],
            use: {
                loader: 'babel-loader',
                query: {
                    'presets': [
                        ['env', {
                            'targets': {
                                'browsers': ['last 2 versions', 'ie >= 10']
                            }
                        }]
                    ]
                }
            }
        }, {
            test: /\.less$/,
            use: extractLess.extract({
                use: [{
                    loader: 'css-loader'
                }, {
                    loader: 'less-loader'
                }],
                fallback: 'style-loader'
            })
        }, {
            test: /\.(jpg|png|svg)$/,
            use: {
                loader: 'file-loader',
                options: {
                    name: './images/[hash].[ext]'
                }
            }
        }]
    },
    plugins: [
        extractLess
    ]
};