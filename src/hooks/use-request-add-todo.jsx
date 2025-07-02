import { ref, push } from 'firebase/database';
import { db } from '../firebase';
import { useState } from 'react';

export const useRequestAddTodo = (refreshData) => {
	const [newTodo, setNewTodo] = useState('');

	const requestAddTodo = () => {
		if (!newTodo.trim()) return;

		const todosRef = ref(db, 'todos');
		push(todosRef, {
			title: newTodo,
			completed: false,
		}).then(() => {
			refreshData();
			setNewTodo('');
		});
	};

	return { newTodo, setNewTodo, requestAddTodo };
};
