// import viteLogo from '/vite.svg'
// import { useState } from 'react';

import { useRequestGetProducts } from './hooks/use-request-get-produts';
import { useRequestAddPilesos } from './hooks/use-request-add-pilesos';
import { useRequestUpdatePhone } from './hooks/use-request-update-phone';
import { useRequestDeleteTv } from './hooks/use-request-delete-tv';

import styles from './App.module.css';

function App() {
	// const [refrashProductsFlag, setRefrashProductsFlag] = useState(false);

	// const refrashProducts = () => setRefrashProductsFlag(!refrashProductsFlag);

	const { isLoading, products } = useRequestGetProducts();

	const { isCreating, requestAddPilesos } = useRequestAddPilesos();
	const { isUpdating, requestUpdatePhone } = useRequestUpdatePhone();
	const { isDeleting, requestDeleteTv } = useRequestDeleteTv();

	return (
		<div className={styles.app}>
			{isLoading ? (
				<div className={styles.loader}></div>
			) : (
				Object.entries(products).map(([id, { name, price }]) => (
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
