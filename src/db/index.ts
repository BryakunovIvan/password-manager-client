const openRequest = indexedDB.open('passDB', 1);
let DB: IDBDatabase = null;

export const initDB = new Promise((resolve, reject) => {
	openRequest.onupgradeneeded = () => {
		DB = openRequest.result;
		if (!DB.objectStoreNames.contains('user')) {
			DB.createObjectStore('user', { keyPath: 'id', autoIncrement: true });
		}
		if (!DB.objectStoreNames.contains('pass')) {
			DB.createObjectStore('pass', { keyPath: 'id', autoIncrement: true });
		}

		resolve(openRequest);
	};

	openRequest.onerror = () => {
		console.error('Error', openRequest.error);
		reject(openRequest);
	};

	openRequest.onsuccess = () => {
		DB = openRequest.result;
		resolve(openRequest);
	};
});

const getDBStore = (objectStoreName: string) => {
	const transaction = DB.transaction(objectStoreName, 'readwrite');
	const store = transaction.objectStore(objectStoreName);

	return store;
};

export const addTransaction = (objectStoreName: string, value: Object) => {
	const store = getDBStore(objectStoreName);
	const request = store.add(value);

	return new Promise((resolve, reject) => {
		request.onerror = () => {
			console.error('Error', request.error);
			reject(request.error);
		};

		request.onsuccess = () => {
			resolve({ ...value, id: request.result });
		};
	});
};

export const getTransaction = (objectStoreName: string) => {
	const store = getDBStore(objectStoreName);
	const request = store.getAll();

	return new Promise((resolve, reject) => {
		request.onerror = () => {
			console.error('Error', request.error);
			reject(request.error);
		};
		request.onsuccess = () => {
			resolve(request.result);
		};
	});
};

export const deleteTransactionById = (objectStoreName: string, id: string | number) => {
	const store = getDBStore(objectStoreName);
	const request = store.delete(id);

	return new Promise((resolve, reject) => {
		request.onerror = () => {
			console.error('Error', request.error);
			reject(request.error);
		};
		request.onsuccess = () => {
			resolve(request.result);
		};
	});
};

// export const addPass = (pass: object) => addTransaction('pass', pass);
// export const getPass = (id: string) => getTransaction('pass', id);

export const deletePass = () => { };
