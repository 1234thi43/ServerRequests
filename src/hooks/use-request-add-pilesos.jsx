import { useState } from 'react';

export const useRequestAddPilesos = (refrashProducts) => {
	const [isCreating, setIsCreating] = useState(false);

	const requestAddPilesos = () => {
		setIsCreating(true);
		fetch('http://localhost:3000/products', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json; charset=utf-8' },
			body: JSON.stringify({
				name: 'Пылесоc',
				price: 2500,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Пылесос добавлен, ответ сервера: ', response);
				refrashProducts();
			})
			.finally(() => setIsCreating(false));
	};

	return {
		isCreating,
		requestAddPilesos,
	};
};
