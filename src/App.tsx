import React, { useState } from 'react';
import { addUser, getUsers } from './db';

const App = () => {
    const [name, setName] = useState('');
    const [user, setUser] = useState(null);
    const handleAddUser = () => {
        addUser({ name }).then(setUser);
    }

    const handleDeleteUser = () => {

    }

    const handleGetUser = () => {
        getUsers('Ivan').then(console.log);
    }

    console.log(user);

    return <div>
        <input value={name} placeholder="Введите имя" onChange={(e) => setName(e.target.value)}></input>
        <button onClick={handleAddUser}>Добавить пользователя</button>
        <button onClick={handleDeleteUser}>Удалить пользователя</button>
        <button onClick={handleGetUser}>Получить пользователей</button>
    </div>
};

export default App;