import { useState } from 'react';

export const useRequestSortTodo = (todos, setTodos, originalTodos, searchQuery) => {
	const [isSorted, setIsSorted] = useState(false);

	const sortTodo = () => {
		if (isSorted) {
			if (searchQuery.trim() === '') {
				setTodos([...originalTodos]);
			} else {
				const filtered = originalTodos.filter((todo) =>
					todo.title.toLowerCase().includes(searchQuery.toLowerCase()),
				);
				setTodos(filtered);
			}
		} else {
			const sortedTodos = [...todos].sort((a, b) => {
				const titleA = a.title.toLowerCase();
				const titleB = b.title.toLowerCase();
				if (titleA < titleB) return -1;
				if (titleA > titleB) return 1;
				return 0;
			});
			setTodos(sortedTodos);
		}
		setIsSorted(!isSorted);
	};

	return { isSorted, sortTodo };
};
