const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const pages = ['index', 'pageTwo'];

module.exports = {
    mode: 'development',
    entry: pages.reduce((config, page) => {
        config[page] = path.resolve(__dirname, `src/js/${page}.js`);
        return config;
    }, {}),

    // entry: {
    //     index: path.resolve(__dirname, 'src/js/index.js'),
    //     pageTwo: path.resolve(__dirname, 'src/js/pageTwo.js'),
    // },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name][contenthash].js',
        clean: true,
        assetModuleFilename: '[name][ext]',
    },
    devtool: 'source-map',
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        port: 3000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     use: {
            //         loader: 'babel-loader',
            //         options: {
            //             presets: ['@babel/preset-env'],
            //         },
            //     },
            // },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [].concat(
        pages.map(
            (page) =>
                new HtmlWebpackPlugin({
                    inject: true,
                    filename: `${page}.html`,
                    template: `./src/${page}.html`,
                    chunks: [page],
                })
        )
    ),
    // plugins: [
    //     new HtmlWebpackPlugin({
    //         filename: 'index.html',
    //         template: './src/index.html',
    //         chunks: ['index'],
    //     }),
    //     new HtmlWebpackPlugin({
    //         filename: 'pageTwo.html',
    //         template: './src/pageTwo.html',
    //         chunks: ['pageTwo'],
    //     }),
    //     // new BundleAnalyzerPlugin(),
    // ],
};
