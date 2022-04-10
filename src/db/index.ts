
const openRequest = indexedDB.open('passDB', 1);
let DB: IDBDatabase = null;

openRequest.onupgradeneeded = function () {
    DB = openRequest.result;
    if (!DB.objectStoreNames.contains('user')) {
        DB.createObjectStore('user', { keyPath: 'id', autoIncrement: true });
    }
    if (!DB.objectStoreNames.contains('pass')) {
        DB.createObjectStore('pass', { keyPath: 'id', autoIncrement: true });
    }
    console.log(DB)
};

openRequest.onerror = function () {
    console.error("Error", openRequest.error);
};

openRequest.onsuccess = function () {
    DB = openRequest.result;
};


const addTransaction = (objectStoreName: string, value: Object) => {
    const transaction = DB.transaction(objectStoreName, 'readwrite');
    const store = transaction.objectStore(objectStoreName);
    const request = store.add(value);

    return new Promise((resolve, reject) => {
        request.onerror = function () {
            console.error("Error", request.error);
            reject(request.error)
        };

        request.onsuccess = () => {
            resolve(value)
        }
    })
}

const getTransaction = (objectStoreName: string, id: string) => {
    const transaction = DB.transaction(objectStoreName, 'readwrite');
    const store = transaction.objectStore(objectStoreName);
    const request = store.getAll();

    return new Promise((resolve, reject) => {
        request.onerror = function () {
            console.error("Error", request.error);
            reject(request.error);
        };
        request.onsuccess = function () {
            resolve(request.result);
        }
    })
}

export const addUser = (user: object) => {
    return addTransaction("user", user)
}
export const getUsers = (name: string) => {
    return getTransaction('user', name)
}

export const addPass = (pass: object) => addTransaction('pass', pass);
export const getPass = (id: string) => getTransaction('pass', id);

export const deletePass = () => { };

export default DB;