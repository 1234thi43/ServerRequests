// import viteLogo from '/vite.svg'
import { useEffect, useState } from 'react';
import styles from './App.module.css';

function App() {
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isCreating, setIsCreating] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [refrashProductsFlag, setRefrashProductsFlag] = useState(false);

	const refrashProducts = () => setRefrashProductsFlag(!refrashProductsFlag);

	useEffect(() => {
		setIsLoading(true);

		fetch('http://localhost:3000/products')
			.then((loadedData) => loadedData.json())
			.then((loadedProducts) => {
				setProducts(loadedProducts);
			})
			.finally(() => setIsLoading(false));
	}, [refrashProductsFlag]);

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

	return (
		<div className={styles.app}>
			{isLoading ? (
				<div className={styles.loader}></div>
			) : (
				products.map(({ id, name, price }) => (
					<div key={id}>
						{name} - {price} руб.
					</div>
				))
			)}

			<button disabled={isCreating} onClick={requestAddPilesos}>
				Добавить пылесос
			</button>
			<button disabled={isUpdating} onClick={requestUpdatePhone}>
				Обновить телефон
			</button>
			<button disabled={isDeleting} onClick={requestDeleteTv}>
				Удалить телевизор
			</button>
		</div>
	);
}

export default App;
