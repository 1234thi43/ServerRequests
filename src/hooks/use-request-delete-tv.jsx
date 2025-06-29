import { useState } from 'react';
import { ref, remove } from 'firebase/database';
import { db } from '../firebase';

export const useRequestDeleteTv = () => {
	const [isDeleting, setIsDeleting] = useState(false);

	const requestDeleteTv = () => {
		setIsDeleting(true);

		const removeTvDbRef = ref(db, 'products/0001');

		remove(removeTvDbRef)
			.then((response) => {
				console.log('Телевизор удалён, ответ сервера: ', response);
			})
			.finally(() => setIsDeleting(false));
	};

	return {
		isDeleting,
		requestDeleteTv,
	};
};
