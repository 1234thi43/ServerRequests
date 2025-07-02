import { ref, set } from 'firebase/database';
import { db } from '../firebase';
import { useState } from 'react';

export const useRequestUpdateTodo = (refreshData, originalTodos) => {
	const [idForChangeTodo, setIdForChangeTodo] = useState('');
	const [textForChangeTodo, setTextForChangeTodo] = useState('');
	const [completedStatus, setCompletedStatus] = useState(false);

	const requestUpdateTodo = () => {
		if (!idForChangeTodo) return;

		const todoToUpdate = originalTodos.find(
			(todo) => String(todo.id) === String(idForChangeTodo),
		);

		if (!todoToUpdate) return;

		const todoRef = ref(db, `todos/${idForChangeTodo}`);
		set(todoRef, {
			title: textForChangeTodo || todoToUpdate.title,
			completed: completedStatus,
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
