import React, { useEffect, useState } from 'react';
import { CreateNewUser } from './components';
import {
	initDB,
} from './db';
import {
	getAllUsers, removeUserById, observer, addUser,
} from './db/users-manager';
import { useObserver } from './hooks/useObserver';

const App = () => {
	const [name, setName] = useState('');
	const users = useObserver(observer, (value) => value);

	const handleDeleteUser = () => {
		removeUserById(users[0].id);
	};

	useEffect(() => {
		initDB
			.then(() => getAllUsers())
			.catch(console.error);
	}, []);

	if (!users.length) {
		return (
			<CreateNewUser />
		);
	}

	return (
		<div>
			<input value={name} placeholder="Введите имя" onChange={(e) => { setName(e.target.value); }} />
			<button onClick={handleDeleteUser}>Удалить пользователя</button>
			<button onClick={() => addUser({ name, secret: 'secret' })}>Создать пользователя</button>
			{
				users.map((user: any) => (
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
