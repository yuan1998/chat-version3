export const cloneOf = (obj) => {
    return JSON.parse(JSON.stringify(obj));
};

export const getUrlParamter = (url) => {
    let vars  = {};
    url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[ key ] = value;
    });
    return vars;
};

export const queryOf = (obj) => {
    let str = '';
    for (let key in obj) {
        let val = obj[ key ];
        if (val === undefined)
            continue;

        str += key + '=' + val + '&';
    }
    return str;
};

export const readerImage = (file , cb) => {
    if (!file || !cb) {
        return;
    }
    var reader = new FileReader();

    reader.onloadend = function () {
        if (typeof cb === 'function') {
            cb(reader);
        }
    };
    reader.readAsDataURL(file)
};



export const pushHistory = () => {
    let state = {
        title: '',
        url: ''
    };
    window.history.pushState(state, state.title, state.url)
};
