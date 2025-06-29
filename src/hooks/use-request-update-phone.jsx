import { useState } from 'react';
import { ref, set } from 'firebase/database';
import { db } from '../firebase';

export const useRequestUpdatePhone = () => {
	const [isUpdating, setIsUpdating] = useState(false);

	const requestUpdatePhone = () => {
		setIsUpdating(true);

		const phoneDbRef = ref(db, 'products/0002');

		// так же есть функция update как patch у json

		set(phoneDbRef, {
			name: 'New Smatrphone',
			price: 228228,
		})
			.then((response) => {
				console.log('Телефон обновился, ответ сервера: ', response);
			})
			.finally(() => setIsUpdating(false));
	};

	return {
		isUpdating,
		requestUpdatePhone,
	};
};
