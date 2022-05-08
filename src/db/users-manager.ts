import { addTransaction, deleteTransactionById, getTransaction } from '.';
import { EventManager } from './event-manager';

type TName = string;
type TID = number;
type TSecret = string;

export type TUser = {
	name: TName;
	id: TID;
	secret: TSecret;
}

class UsersManager {
	constructor() {
		this.observer = new EventManager([]);
	}

	public observer: EventManager<TUser[]>;

	public addUser = async (user: Omit<TUser, 'id'>) => {
		addTransaction('user', user);

		const users = await this.getAllUsers();
		this.setValue(users);
		this.observer.notifySubscribers();
	};

	public removeUserById = async (userId: TID) => {
		deleteTransactionById('user', userId);
		const users = await this.getAllUsers();

		this.setValue(users);
		this.observer.notifySubscribers();
	};

	public getAllUsers = async () => {
		const users = await getTransaction('user');
		this.setValue(users);
		this.observer.notifySubscribers();

		return users as TUser[];
	};

	private setValue = (value: any) => {
		this.observer.setValue(value);
	};
}

export const {
	addUser, removeUserById, getAllUsers, observer,
} = new UsersManager();
