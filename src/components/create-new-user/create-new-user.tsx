import React, { useState } from 'react';
import { addUser } from '../../db/userPublisher';

export const CreateNewUser = () => {
	const [name, setName] = useState('');
	const [secret, setSecret] = useState('');

	const handleClick = () => {
		addUser({ name, secret });
	};

	return (
		<div>
			Создайте пользователя
			<input value={name} placeholder="Введите имя" onChange={(e) => setName(e.target.value)} />
			<input value={secret} placeholder="Введите имя" onChange={(e) => setSecret(e.target.value)} />
			<button onClick={handleClick}>Создать</button>
		</div>
	);
};
