window._agl = window._agl || [];

(function () {
    var host = window.location.host;

    var item = null;
    switch (host) {
        case 'xl2.xaylmr.com':
        case 'xl1.hmkqyy.vip':
        case 'xl.hmmryy.vip':
            item = '_f7L2XwGXjyszb4d1e2oxPybgD';
            break;
    }
    console.log(item);
    if (item) {
        _agl.push(
            [ 'production', item ]
        );
        (function () {
            var agl   = document.createElement('script');
            agl.type  = 'text/javascript';
            agl.async = true;
            agl.src   = 'https://fxgate.baidu.com/angelia/fcagl.js?production=' + item;
            var s     = document.getElementsByTagName('script')[ 0 ];
            s.parentNode.insertBefore(agl, s);
        })();
    }
})();

function $_aglPush() {
    if (window._agl && typeof window._agl.push === 'function') {
        window._agl.push(['track', ['success', {t: 3}]])
    }
}
