const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    publicPath  : isProd
        ? '/zt/new-chat-version-3/'
        : '/',
    chainWebpack: config => {
        if (isProd) {
            config.externals({
                'vue-router': 'VueRouter',
                'animejs'   : 'anime',
                'jquery'    : 'jQuery',
                vuex        : 'Vuex',
                vue         : 'Vue',
            });
        }
    }
}
