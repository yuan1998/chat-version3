export const randomInProbability = (arr, key = 'probability') => {
    let weights = [];

    arr.forEach(function (item) {
        let each = item[ key ];
        if (!each && each !== 0)
            return;

        weights.push(each);
    });

    let total,
        current = 0,
        parts   = [],
        i       = 0,
        l       = weights.length;

    total = weights.reduce ? weights.reduce(function (a, b) {
        return a + b;
    }) : eval(weights.join('+'));

    for (; i < l ; i++) {
        current += weights[ i ];
        parts.push('if( p < ', current / total, ' ) return ', i / l, ' + n;');
    }

    return Function('var p = Math.random(), n = Math.random() / ' + l + ';' + parts.join(''));
};

