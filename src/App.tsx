import React, { useEffect, useState } from 'react';
import {
	addUser, deleteUserById, getAllUsers, initDB,
} from './db';
import { UserPublisherExample } from './db/userPublisher';

type TUser = { name: string, id: number }
function App() {
	const [name, setName] = useState('');
	const [users, setUsers] = useState<Array<TUser>>([] as Array<TUser>);

	UserPublisherExample.subscribe(setUsers);

	const handleAddUser = () => {
		UserPublisherExample.addUser({ name });
		// addUser({ name }).then((newUser) => setUsers([(newUser as TUser), ...users]));
	};

	const handleDeleteUser = () => {
		deleteUserById(users[0].id).then(() => getAllUsers().then(setUsers));
	};

	useEffect(() => {
		initDB
			.then(() => getAllUsers().then(setUsers))
			.catch(console.error);
	}, []);

	return (
		<div>
			<input value={name} placeholder="Введите имя" onChange={(e) => setName(e.target.value)} />
			<button onClick={handleAddUser}>Добавить пользователя</button>
			<button onClick={handleDeleteUser}>Удалить пользователя</button>
			{
				users.map((user) => (
					<div key={user.id}>
						{user.name}
						{' '}
						{user.id}
					</div>
				))
			}
		</div>
	);
}

export default App;
