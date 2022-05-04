import React, { useEffect, useState } from 'react';
import { CreateNewUser } from './components';
import {
	initDB,
} from './db';
import {
	getAllUsers, removeUserById, subscribe, TUser,
} from './db/userPublisher';

const App = () => {
	const [name, setName] = useState('');
	const [users, setUsers] = useState<Array<TUser>>([] as Array<TUser>);

	subscribe(setUsers);

	const handleDeleteUser = () => {
		removeUserById(users[0].id);
	};

	useEffect(() => {
		initDB
			.then(() => getAllUsers().then(setUsers))
			.catch(console.error);
	}, []);

	if (!users.length) {
		return (
			<CreateNewUser />
		);
	}

	return (
		<div>
			<input value={name} placeholder="Введите имя" onChange={(e) => setName(e.target.value)} />
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
};

export default App;
