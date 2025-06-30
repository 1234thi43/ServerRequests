// import { ref, remove } from 'firebase/database';
// import { db } from '../firebase';

export const useRequestDeleteTodo = (refreshData) => {
	const URL_TODOS = 'http://localhost:3000/todos';

	const requestDeleteTodo = (id) => {
		fetch(`${URL_TODOS}/${id}`, {
			method: 'DELETE',
		}).then(() => refreshData());
	};

	return { requestDeleteTodo };
};
