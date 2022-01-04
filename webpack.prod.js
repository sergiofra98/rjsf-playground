const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    externals: {
        config: JSON.stringify({
            apiUrl: 'https://api-dev.jyreh.mx'
        })
    }
});