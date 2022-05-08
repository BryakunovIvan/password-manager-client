import { useEffect, useState } from 'react';
import { EventManager } from '../db/event-manager';

// eslint-disable-next-line no-unused-vars
type TFunc<T> = (val: T) => T

/** T extends {} вместо T, потому что tsx ругается на незакрытый тег <T>  */
export const useObserver = <T extends {}>(observer: Required<EventManager<T>>, func: TFunc<T>) => {
	const [value, setValue] = useState(observer.getValue());

	useEffect(() => {
		const subscriber = (observerValue: T) => setValue(func(observerValue));
		observer.subscribe(subscriber);

		return () => observer.unsubscribe(subscriber);
	}, []);

	return value;
};
