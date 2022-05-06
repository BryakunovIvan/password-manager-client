type TSubscriberId = string | number;
type TSubscribersFunc = Function;

type TSubscriber = {
	func: TSubscribersFunc;
	_id: TSubscriberId
}

export class EventManager<T> {
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

	notifySubscribers = (value: T) => {
		this.subscribers.forEach((subscriber) => {
			subscriber.func(value);
		});
	};
}
