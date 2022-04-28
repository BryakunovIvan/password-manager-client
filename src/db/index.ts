
const openRequest = indexedDB.open('passDB', 1);
let DB: IDBDatabase = null;

export const initDB = new Promise((resolve, reject) => {
    openRequest.onupgradeneeded = function () {
        DB = openRequest.result;
        if (!DB.objectStoreNames.contains('user')) {
            DB.createObjectStore('user', { keyPath: 'id', autoIncrement: true });
        }
        if (!DB.objectStoreNames.contains('pass')) {
            DB.createObjectStore('pass', { keyPath: 'id', autoIncrement: true });
        }
        resolve(openRequest);
    };
    
    openRequest.onerror = function () {
        console.error("Error", openRequest.error);
        reject(openRequest)
    };
    
    openRequest.onsuccess = function () {
        DB = openRequest.result;
        resolve(openRequest);
    };
})

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
            resolve({...value, id: request.result});
        }
    })
}

const getTransaction = (objectStoreName: string) => {
    console.log(DB)
    const transaction = DB.transaction(objectStoreName, 'readwrite');
    const store = transaction.objectStore(objectStoreName);
    const request = store.getAll();

    return new Promise((resolve, reject) => {
        request.onerror = function () {
            console.error("Error", request.error);
            reject(request.error);
        };
        request.onsuccess = function () {
            console.log(request.result)
            resolve(request.result);
        }
    })
}

export const addUser = (user: object) => {
    return addTransaction("user", user)
}
export const getAllUsers = () => {
    return getTransaction('user')
}

// export const addPass = (pass: object) => addTransaction('pass', pass);
// export const getPass = (id: string) => getTransaction('pass', id);

export const deletePass = () => { };

export default DB;