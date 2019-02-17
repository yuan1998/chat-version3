import { getUrlParamter } from './util'

const items = [
    {
        url  : /baidu.com.+\?/,
        query: 'word',
        prev : 'oq'
    },
    {
        url  : /google.com.+\?/,
        query: 'q',
        prev : null
    },
    {
        url  : /so.com.+\?/,
        query: 'q',
        prev : null
    },
    {
        url  : /sogou.com.+\?/,
        query: 'keyword',
        prev : null
    },
    {
        url  : /sm.cn.+\?/,
        query: 'q',
        prev : null
    },

];

export const checkReferrer = (defaultResult = undefined) => {
    const referrer = process.env.NODE_ENV === "development" ? process.env.VUE_APP_REFERRER : document.referrer;
    let result      = '';

    if (!referrer) {
        return defaultResult;
    }

    let breakEach = false;
    items.forEach(function (item) {
        if (item[ 'url' ].test(referrer) && !breakEach) {
            let obj   = getUrlParamter(referrer);
            result    = decodeURIComponent((obj[ item[ 'query' ] ] || '').replace(/\+/g, ' '));
            breakEach = !breakEach;
        }
    });

    return result || defaultResult;
}
