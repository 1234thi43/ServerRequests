import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';
import { useEffect, useState } from 'react';

export const useRequestGetTodos = (refreshFlag) => {
	const [todos, setTodos] = useState([]);
	const [originalTodos, setOriginalTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		const todosRef = ref(db, 'todos');
		onValue(todosRef, (snapshot) => {
			const data = snapshot.val();
			if (data) {
				const todosArray = Object.entries(data).map(([id, todo]) => ({
					id,
					...todo,
				}));
				setTodos(todosArray);
				setOriginalTodos(todosArray);
			} else {
				setTodos([]);
				setOriginalTodos([]);
			}
			setIsLoading(false);
		});
	}, [refreshFlag]);

	return { todos, originalTodos, isLoading, setTodos };
};
