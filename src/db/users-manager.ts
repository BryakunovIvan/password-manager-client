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
		this.events = new EventManager();
	}

	public events: EventManager<TUser[]>;

	public addUser = async (user: Omit<TUser, 'id'>) => {
		addTransaction('user', user);
		this.events.notifySubscribers(await this.getAllUsers());
	};

	public removeUserById = async (userId: TID) => {
		deleteTransactionById('user', userId);
		this.events.notifySubscribers(await this.getAllUsers());
	};

	public getAllUsers = async () => {
		const users = await getTransaction('user');
		return users as TUser[];
	};
}

export const {
	addUser, removeUserById, getAllUsers, events,
} = new UsersManager();
