// import { ref, push } from 'firebase/database';
// import { db } from '../firebase';

import { useState } from 'react';

export const useRequestAddTodo = (refreshData) => {
	const [newTodo, setNewTodo] = useState('');

	const URL_TODOS = 'http://localhost:3000/todos';

	const requestAddTodo = () => {
		if (!newTodo.trim()) return;

		fetch(URL_TODOS, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json; charset=utf-8' },
			body: JSON.stringify({
				title: newTodo,
				completed: false,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then(() => {
				refreshData();
				setNewTodo('');
			});
	};

	return { newTodo, setNewTodo, requestAddTodo };
};
