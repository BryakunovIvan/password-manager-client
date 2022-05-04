export class Publisher<T> {
	subscribers: Array<Function> = [];

	subscribe = (subscriber: Function) => {
		this.subscribers.push(subscriber);
	};

	unsubscribe: () => {
		// TODO
	};

	notifySubscribers = (value: T) => {
		this.subscribers.forEach((subscriber) => {
			subscriber(value);
		});
	};
}
