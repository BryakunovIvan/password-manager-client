export class Publisher {
	subscribers: Array<Function> = [];

	subscribe = (subscriber: Function) => {
		this.subscribers.push(subscriber);
	};

	unsubscribe: () => {
		// TODO
	};

	notifySubscribers = (params: any) => {
		this.subscribers.forEach((subscriber) => {
			subscriber(params);
		});
	};
}
