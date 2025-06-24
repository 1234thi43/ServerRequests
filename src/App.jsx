// import viteLogo from '/vite.svg'
import { useEffect, useState } from 'react';
import styles from './App.module.css';

function App() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		fetch('https://mocki.io/v1/11a4ec3a-7513-4574-9b1d-813d06ca84a2')
			.then((loadedData) => loadedData.json())
			.then((loadedProducts) => {
				setProducts(loadedProducts);
			});
	}, []);

	return (
		<div className={styles.app}>
			{products.map(({ id, name, price }) => (
				<div key={id}>
					{name} - {price} руб.
				</div>
			))}
		</div>
	);
}

export default App;
