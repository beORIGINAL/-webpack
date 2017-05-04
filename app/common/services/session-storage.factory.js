export function SessionStorageFactory () {
    'ngInject';
    return {
        get,
        save,
        remove,
        clear
    };

    function get (key) {
        return JSON.parse(sessionStorage.getItem(key));
    }

    function save (key, data) {
        return sessionStorage.setItem(key, JSON.stringify(data));
    }

    function remove (key) {
        return sessionStorage.removeItem(key);
    }

    function clear () {
        return sessionStorage.clear();
    }
}