// import viteLogo from '/vite.svg'
import { useEffect, useState } from 'react';
import styles from './App.module.css';

function App() {
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isCreating, setIsCreating] = useState(false);
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
				price: 2009,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Пылесос добавлен, ответ сервера: ', response);
				refrashProducts();
			})
			.finally(() => setIsCreating(false));
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

			<button disabled={isCreating} onClick={requestAddPilesos}>Добавить пылесос</button>
		</div>
	);
}

export default App;
