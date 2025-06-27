import { useEffect, useState } from 'react';

export const useRequestGetProducts = (refrashProductsFlag) => {
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);

		fetch('http://localhost:3000/products')
			.then((loadedData) => loadedData.json())
			.then((loadedProducts) => {
				setProducts(loadedProducts);
			})
			.finally(() => setIsLoading(false));
	}, [refrashProductsFlag]);

	return {
		isLoading,
		products,
	};
};
