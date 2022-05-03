import { addUser, getAllUsers } from '.';
import { Publisher } from './publisher';

export class UserPublisher extends Publisher {
	addUser = async (user: object) => {
		addUser(user);
		const users = await getAllUsers();
		this.notifySubscribers(users);
	};
}

export const UserPublisherExample = new UserPublisher();
