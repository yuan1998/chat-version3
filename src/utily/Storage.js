const prefix = 'YUAN_ONE_A';

 const Storage = {
    getItem(key) {
        key = prefix + key;
        let result = localStorage.getItem(key);
        return result ? JSON.parse(result) : undefined;
    },
    setItem(key, value = '') {
        key = prefix + key;
        localStorage.setItem(key,
            JSON.stringify(value));
    },
    removeItem(key) {
        key = prefix + key;
        localStorage.removeItem(key);
    },
    clear() {
        localStorage.clear();
    }
}
export default Storage;

