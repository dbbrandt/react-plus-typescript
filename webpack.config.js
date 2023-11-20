// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: './src/index.tsx',
    devtool: 'eval-source-map',
    resolve: {
        extensions: ['.js','.ts','.tsx']
    },
    module: {
        rules: [
            {
                test: /\.svg$/,
                use: {
                    loader: '@svgr/webpack',
                    options: {
                        removeViewBox: false,
                    }
                },
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, { loader: 'css-loader', options: {modules: true}}]
            },
            {
                test: /\.tsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
        ]
    },
    output: {
        path: __dirname + '/dist',
        filename: 'index_bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin()
    ]
}