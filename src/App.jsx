import { useEffect, useState } from 'react';
import styles from './App.module.css';

function App() {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);

		fetch('https://jsonplaceholder.typicode.com/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedTodos) => {
				setTodos(loadedTodos);
			})
			.finally(() => setIsLoading(false));
	}, []);

	return (
		<div className={styles.app}>
			{isLoading ? (
				<div className={styles.loader}></div>
			) : (
				todos.map(({ id, title }) => (
					<div className={styles.todo} key={id}>
						Задача: {title}
					</div>
				))
			)}
		</div>
	);
}

export default App;
