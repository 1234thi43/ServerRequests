import { useState } from 'react';
import { ref, push } from 'firebase/database';
import { db } from '../firebase';

export const useRequestAddPilesos = () => {
	const [isCreating, setIsCreating] = useState(false);

	const requestAddPilesos = () => {
		setIsCreating(true);

		const productsDbRef = ref(db, 'products');

		push(productsDbRef, {
			name: 'Новый пылесос',
			price: 5999,
		})
			.then((response) => {
				console.log('Пылесос добавлен, ответ сервера: ', response);
			})
			.finally(() => setIsCreating(false));
	};

	return {
		isCreating,
		requestAddPilesos,
	};
};
