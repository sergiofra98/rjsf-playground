const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        historyApiFallback: true,
        host: '127.0.0.1',
        port: 8888
    },
    externals: {
        config: JSON.stringify({
            apiUrl: process.env.API_URL
        })
    }
});
