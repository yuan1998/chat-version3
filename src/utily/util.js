export const cloneOf = (obj) => {
    return JSON.parse(JSON.stringify(obj));
};

export const getUrlParamter = (url) => {
    let vars = {};
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

export const readerImage = (file, cb) => {
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
        url  : ''
    };
    window.history.pushState(state, state.title, state.url)
};

/**
 * 解析方法字符串
 * @param string {String} 方法字符串
 * @returns {{method: *, params: Array}}
 */
export const parseStringMethod = (string) => {
    let arr = string.split(':');

    let method = arr[ 0 ];
    let params = [];
    if (arr[ 1 ]) {
        params = arr[ 1 ].split("|");
    }

    return {
        method,
        params
    }
};

export const shuffleArray = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

export const oneOf = (arr, val) => {
    return arr.includes(val);
};

export const randomNum = (max, min = 0) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const elementOffset = (el) => {
    let itemEl = $(el);
    return {
        ...itemEl.offset(),
        height: itemEl.outerHeight(),
        width : itemEl.outerWidth()
    };
}

export const addImageProcess = (src) => {
    return new Promise((resolve, reject) => {
        let img     = new Image();
        img.onload  = () => resolve(img.height);
        img.onerror = reject;
        img.src     = src
    })
};
