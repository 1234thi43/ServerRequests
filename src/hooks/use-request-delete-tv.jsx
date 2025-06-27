import { useState } from 'react';

export const useRequestDeleteTv = (refrashProducts) => {
	const [isDeleting, setIsDeleting] = useState(false);

	const requestDeleteTv = () => {
		setIsDeleting(true);
		fetch('http://localhost:3000/products/0001', {
			method: 'DELETE',
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Телевизор удалён, ответ сервера: ', response);
				refrashProducts();
			})
			.finally(() => setIsDeleting(false));
	};

	return {
		isDeleting,
		requestDeleteTv,
	};
};
