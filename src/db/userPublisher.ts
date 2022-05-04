import { addUser, deleteUserById, getAllUsers } from '.';
import { Publisher } from './publisher';

type TName = string;
type TID = number;
type TSecret = string;

type TUser = {
	name: TName;
	id: TID;
	secret: TSecret;
}

export class UserPublisher extends Publisher<TUser[]> {
	// TODO: убрать secret после создания регистрации.
	addUser = async (user: Omit<TUser, 'id' | 'secret'>) => {
		addUser(user);
		this.notifySubscribers(await this.getAllUsers());
	};

	removeUserById = async (userId: TID) => {
		deleteUserById(userId);
		this.notifySubscribers(await this.getAllUsers());
	};

	getAllUsers = async () => {
		const users = await getAllUsers();
		return users as TUser[];
	};
}

export const UserPublisherExample = new UserPublisher();
