type TSubscriberId = string | number;
type TSubscribersFunc = Function;

type TSubscriber = {
	func: TSubscribersFunc;
	_id: TSubscriberId
}

export class EventManager<T> {
	constructor(value: T) {
		this.value = value;
	}

	private value: T = null;

	private subscribers: Array<TSubscriber> = [];

	private subscribeFunctionWithId = (subscriber: TSubscribersFunc, id: TSubscriberId) => {
		if (this.subscribers.some((sub) => sub._id === id)) {
			this.subscribers = this.subscribers.map((sub) => {
				if (sub._id === id) {
					return { func: subscriber, _id: id };
				}

				return sub;
			});
		} else {
			this.subscribers.push({ func: subscriber, _id: id });
		}

		return id;
	};

	private subscribeFunction = (subscriber: TSubscribersFunc) => {
		if (this.subscribers.some((sub) => sub.func === subscriber)) {
			return false;
		}

		const id = Math.random();
		this.subscribers.push({ func: subscriber, _id: id });

		return id;
	};

	private unsubscribeFunctionWithId = (id: TSubscriberId) => {
		this.subscribers = this.subscribers.filter((sub) => sub._id !== id);
	};

	private unsubscribeFunction = (subscriber: TSubscribersFunc) => {
		this.subscribers = this.subscribers.filter((sub) => sub.func !== subscriber);
	};

	public setValue = (value: T) => {
		this.value = value;
	};

	public getValue = () => this.value;

	public getSubscribers = () => this.subscribers;

	subscribe = (subscriber: TSubscribersFunc, unicueId?: TSubscriberId) => {
		if (unicueId) {
			return this.subscribeFunctionWithId(subscriber, unicueId);
		}

		return this.subscribeFunction(subscriber);
	};

	unsubscribe = (subscriber: TSubscribersFunc | TSubscriberId) => {
		if (typeof subscriber === 'function') {
			this.unsubscribeFunction(subscriber);
		}

		if (typeof subscriber === 'number' || typeof subscriber === 'string') {
			this.unsubscribeFunctionWithId(subscriber);
		}
	};

	notifySubscribers = () => {
		this.subscribers.forEach((subscriber) => {
			subscriber.func(this.value);
		});
	};
}
