function byteToHex(byte: number) {
	return (`0${byte.toString(16)}`).slice(-2);
}

export function generateHash(len: number = 40) {
	const arr = new Uint8Array(len / 2);
	window.crypto.getRandomValues(arr);
	return Array.from(arr, byteToHex).join('');
}
