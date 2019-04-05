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

export const getReferrer = () => {
    return (process.env.NODE_ENV === "development" ? process.env.VUE_APP_REFERRER : document.referrer) || '';
};

export const checkReferrer = (defaultResult = '') => {
    const referrer = getReferrer();
    let result     = '';

    if (!referrer) {
        return defaultResult;
    }

    let searchEngine = items.find(e => e[ 'url' ].test(referrer));
    if (searchEngine) {
        let obj = getUrlParamter(referrer);
        result  = decodeURIComponent((obj[ searchEngine[ 'query' ] ] || '').replace(/\+/g, ' '));
    }

    return result || defaultResult;
}
