
const openRequest = indexedDB.open('passDB', 1);
let DB: IDBDatabase = null;

export let userTransaction: IDBTransaction = null;
export let passTransaction: IDBTransaction = null;

openRequest.onupgradeneeded = function () {
    DB = openRequest.result;
    if (!DB.objectStoreNames.contains('user')) {
        DB.createObjectStore('user');
    }
    if (!DB.objectStoreNames.contains('books')) {
        DB.createObjectStore('pass', { keyPath: 'id' });
    }
    console.log(DB)
};

openRequest.onerror = function () {
    console.error("Error", openRequest.error);
};

openRequest.onsuccess = function () {
    DB = openRequest.result;
    userTransaction = DB.transaction("user", "readwrite");
    passTransaction = DB.transaction("pass", "readwrite");
};


const addTransaction = (transaction: IDBTransaction, objectStoreName: string, value: Object) => {
    const store = transaction.objectStore(objectStoreName);
    const request = store.add(value);

    request.onerror = function () {
        console.error("Error", request.error);
    };
}

export const addUser = (user: object) => addTransaction(userTransaction, 'user', user);
export const addPass = (pass: object) => addTransaction(passTransaction, 'pass', pass);

export default DB;