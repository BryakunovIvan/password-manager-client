type TSubscriberId = string | number;

type TSubscriber = {
	func: Function;
	_id: TSubscriberId
}

export class EventManager<T> {
	subscribers: Array<TSubscriber> = [];

	subscribe = (subscriber: Function, unicueId?: TSubscriberId) => {
		let _id = unicueId;

		if (_id && this.subscribers.some((sub) => sub._id === unicueId)) {
			this.subscribers = this.subscribers.map((sub) => {
				if (sub._id === unicueId) {
					return { func: subscriber, _id: unicueId };
				}

				return sub;
			});
		}

		if (!this.subscribers.some((sub) => sub.func === subscriber)) {
			_id = _id || Math.random();
			this.subscribers.push({ func: subscriber, _id });
		}

		return _id;
	};

	unsubscribe = (subscriber: Function | TSubscriberId) => {
		if (typeof subscriber === 'function') {
			this.subscribers = this.subscribers.filter((sub) => sub.func !== subscriber);
		} else {
			this.subscribers = this.subscribers.filter((sub) => sub._id !== subscriber);
		}
	};

	notifySubscribers = (value: T) => {
		this.subscribers.forEach((subscriber) => {
			subscriber.func(value);
		});
	};
}
