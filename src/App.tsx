import React, { useEffect, useState } from 'react';
import { addUser, getAllUsers } from './db';

type TUser = { name: string, id: number }
const App = () => {
    const [name, setName] = useState('');
    const [users, setUsers] = useState<Array<TUser>>([] as Array<TUser>);
    const handleAddUser = () => {
        addUser({ name }).then((newUser) => setUsers([(newUser as TUser), ...users]));
    }

    const handleDeleteUser = () => {

    }

    useEffect(() => {
        getAllUsers().then(setUsers);
    });

    return <div>
        <input value={name} placeholder="Введите имя" onChange={(e) => setName(e.target.value)}></input>
        <button onClick={handleAddUser}>Добавить пользователя</button>
        <button onClick={handleDeleteUser}>Удалить пользователя</button>
        {
              users.map(user => <div key={user.id}>{user.name} {user.id}</div>)
        }
    </div>
};

export default App;