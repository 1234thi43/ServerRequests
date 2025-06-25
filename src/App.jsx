// import viteLogo from '/vite.svg'
import { useEffect, useState } from 'react';
import styles from './App.module.css';

const PRODUCTS_MOCK = [
	{
		id: '0001',
		name: 'Телевизор',
		price: 10000,
	},
	{
		id: '0002',
		name: 'Телефон',
		price: 5000,
	},
	{
		id: '0003',
		name: 'Компьютер',
		price: 50000,
	},
];

function App() {
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);

		new Promise((resolve) => {
			setTimeout(() => {
				resolve({ json: () => PRODUCTS_MOCK });
			}, 5000);
		})
			.then((loadedData) => loadedData.json())
			.then((loadedProducts) => {
				setProducts(loadedProducts);
			})
			.finally(() => setIsLoading(false));
	}, []);

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
		</div>
	);
}

export default App;
