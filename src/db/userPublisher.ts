import { addTransaction, deleteTransactionById, getTransaction } from '.';
import { Publisher } from './publisher';

type TName = string;
type TID = number;
type TSecret = string;

export type TUser = {
	name: TName;
	id: TID;
	secret: TSecret;
}

class UserPublisher extends Publisher<TUser[]> {
	// TODO: убрать secret после создания регистрации.
	addUser = async (user: Omit<TUser, 'id' | 'secret'>) => {
		addTransaction('user', user);
		this.notifySubscribers(await this.getAllUsers());
	};

	removeUserById = async (userId: TID) => {
		deleteTransactionById('user', userId);
		this.notifySubscribers(await this.getAllUsers());
	};

	getAllUsers = async () => {
		const users = await getTransaction('user');
		return users as TUser[];
	};
}

export const {
	addUser, removeUserById, getAllUsers, subscribe,
} = new UserPublisher();
