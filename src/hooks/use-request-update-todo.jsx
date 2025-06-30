// import { ref, set } from 'firebase/database';
// import { db } from '../firebase';

import { useState } from 'react';

export const useRequestUpdateTodo = (refreshData, originalTodos) => {
	const [idForChangeTodo, setIdForChangeTodo] = useState('');
	const [textForChangeTodo, setTextForChangeTodo] = useState('');
	const [completedStatus, setCompletedStatus] = useState(false);

	const URL_TODOS = 'http://localhost:3000/todos';

	const requestUpdateTodo = () => {
		if (!idForChangeTodo) return;

		const URL_FOR_CHANGE = `${URL_TODOS}/${idForChangeTodo}`;

		if (!Array.isArray(originalTodos)) {
			console.error('originalTodos is not an array');
			return;
		}

		const todoToUpdate = originalTodos.find(
			(todo) => String(todo.id) === String(idForChangeTodo),
		);

		if (!todoToUpdate) return;

		const updatedData = {
			title: textForChangeTodo || todoToUpdate.title,
			completed: completedStatus,
		};

		fetch(URL_FOR_CHANGE, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json; charset=utf-8' },
			body: JSON.stringify(updatedData),
		}).then(() => {
			refreshData();
			setIdForChangeTodo('');
			setTextForChangeTodo('');
			setCompletedStatus(false);
		});
	};

	return {
		idForChangeTodo,
		setIdForChangeTodo,
		textForChangeTodo,
		setTextForChangeTodo,
		completedStatus,
		setCompletedStatus,
		requestUpdateTodo,
	};
};
