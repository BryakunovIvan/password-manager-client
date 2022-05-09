import { EventManager } from '../event-manager';

let observer = null as EventManager<Array<any>>;

beforeAll(() => {
	// Мок для функции generateHash
	const mGetRandomValues = jest.fn().mockReturnValueOnce(new Uint32Array(10));
	Object.defineProperty(window, 'crypto', {
		value: { getRandomValues: mGetRandomValues },
	});
});

beforeEach(() => {
	observer = new EventManager([]);
});

describe('Event manager', () => {
	test('Должен добавлять подписчика в массив подписчиков', () => {
		observer.subscribe(() => {});
		expect(observer.getSubscribers().length).toEqual(1);
	});

	test('Не должен добавлять одного и того же подписчика дважды', () => {
		const sub = () => {};
		observer.subscribe(sub);
		observer.subscribe(sub);
		expect(observer.getSubscribers().length).toEqual(1);
	});

	test('Должен удалять подписчика', () => {
		const sub = () => {};
		observer.subscribe(sub);
		observer.unsubscribe(sub);
		expect(observer.getSubscribers().length).toEqual(0);
	});

	test('Должен оповещать всех подписчиков при вызове функции оповещения', () => {
		const sub = jest.fn();
		observer.subscribe(sub);
		observer.notifySubscribers();

		expect(sub).toBeCalled();
	});

	test('Должен передавать всем подписчикам свое состояние', () => {
		const value = ['Value'];
		observer.setValue(value);

		const sub = jest.fn();
		observer.subscribe(sub);
		observer.notifySubscribers();

		expect(sub).toHaveBeenCalledWith(value);
	});
});
