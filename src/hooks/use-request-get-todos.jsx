// import { ref, onValue } from 'firebase/database';
// import { db } from '../firebase';

import { useEffect, useState } from 'react';

export const useRequestGetTodos = (refreshFlag) => {
	const [todos, setTodos] = useState([]);
	const [originalTodos, setOriginalTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const URL_TODOS = 'http://localhost:3000/todos';

	useEffect(() => {
		setIsLoading(true);
		fetch(URL_TODOS)
			.then((loadedData) => loadedData.json())
			.then((loadedTodos) => {
				setTodos(loadedTodos);
				setOriginalTodos(loadedTodos);
			})
			.finally(() => setIsLoading(false));
	}, [refreshFlag]);

	return { todos, originalTodos, isLoading, setTodos };
};
