import { useState } from 'react';

export const useRequestUpdatePhone = (refrashProducts) => {
	const [isUpdating, setIsUpdating] = useState(false);

	const requestUpdatePhone = () => {
		setIsUpdating(true);
		fetch('http://localhost:3000/products/0002', {
			method: 'PUT', // Еще есть PATCH. Для него нужно указывать только ту строку которая изменяется. Поэтому PUT более стабильно работает
			headers: { 'Content-Type': 'application/json; charset=utf-8' },
			body: JSON.stringify({
				name: 'Телефон',
				price: 1500,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Телефон обновился, ответ сервера: ', response);
				refrashProducts();
			})
			.finally(() => setIsUpdating(false));
	};

	return {
		isUpdating,
		requestUpdatePhone,
	};
};
