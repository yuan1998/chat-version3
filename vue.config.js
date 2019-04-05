const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    publicPath  : isProd
        ? '/zt/new-chat-version-3/'
        : '/',
    devServer: {
        port: 80,
        disableHostCheck: true
    },
    chainWebpack: config => {
        if (isProd) {
            config.externals({
                'vue-router': 'VueRouter',
                'animejs'   : 'anime',
                'moment'   : 'moment',
                'jquery'    : 'jQuery',
                vuex        : 'Vuex',
                vue         : 'Vue',
            });
        }
    }
}
