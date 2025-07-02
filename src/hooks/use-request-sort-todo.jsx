import { useState } from 'react';

export const useRequestSortTodo = (todos, setTodos, originalTodos, searchQuery) => {
	const [isSorted, setIsSorted] = useState(false);
	const [sortDirection, setSortDirection] = useState('asc');

	const sortTodo = () => {
		if (isSorted) {
			// Возвращаем к исходному порядку с учетом поиска
			if (searchQuery.trim() === '') {
				setTodos([...originalTodos]);
			} else {
				const filtered = originalTodos.filter((todo) =>
					String(todo.title).toLowerCase().includes(searchQuery.toLowerCase()),
				);
				setTodos(filtered);
			}
			setIsSorted(false);
		} else {
			// Сортируем по алфавиту текущий список (уже отфильтрованный)
			const sortedTodos = [...todos].sort((a, b) => {
				const titleA = String(a.title).toLowerCase();
				const titleB = String(b.title).toLowerCase();

				if (sortDirection === 'asc') {
					return titleA.localeCompare(titleB);
				} else {
					return titleB.localeCompare(titleA);
				}
			});
			setTodos(sortedTodos);
			setIsSorted(true);
			setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
		}
	};

	return { isSorted, sortTodo };
};
