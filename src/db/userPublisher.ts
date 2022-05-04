import { addUser, getAllUsers } from '.';
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
	addUser = async (user: object) => {
		addUser(user);
		this.notifySubscribers(await this.getAllUsers());
	};

	getAllUsers = async () => {
		const users = await getAllUsers();
		return users as TUser[];
	};
}

export const UserPublisherExample = new UserPublisher();
