import { ref, remove } from 'firebase/database';
import { db } from '../firebase';

export const useRequestDeleteTodo = (refreshData) => {
	const requestDeleteTodo = (id) => {
		const todoRef = ref(db, `todos/${id}`);
		remove(todoRef).then(() => refreshData());
	};

	return { requestDeleteTodo };
};
