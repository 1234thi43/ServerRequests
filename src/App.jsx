import { useState } from 'react';
import styles from './App.module.css';

import { useRequestAddTodo } from './hooks/use-request-add-todo';
import { useRequestDeleteTodo } from './hooks/use-request-delete-todo';
import { useRequestGetTodos } from './hooks/use-request-get-todos';
import { useRequestUpdateTodo } from './hooks/use-request-update-todo';
import { useRequestSortTodo } from './hooks/use-request-sort-todo';

function App() {
	const [refreshFlag, setRefreshFlag] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const refreshData = () => setRefreshFlag(!refreshFlag);

	const { todos, originalTodos, isLoading, setTodos } = useRequestGetTodos(refreshFlag);
	const { newTodo, setNewTodo, requestAddTodo } = useRequestAddTodo(refreshData);
	const {
		idForChangeTodo,
		setIdForChangeTodo,
		textForChangeTodo,
		setTextForChangeTodo,
		completedStatus,
		setCompletedStatus,
		requestUpdateTodo,
	} = useRequestUpdateTodo(refreshData, originalTodos);
	const { requestDeleteTodo } = useRequestDeleteTodo(refreshData);
	const { isSorted, sortTodo } = useRequestSortTodo(
		todos,
		setTodos,
		originalTodos,
		searchQuery,
	);

	const handleSearch = (query) => {
		setSearchQuery(query);
		if (query.trim() === '') {
			setTodos(originalTodos);
		} else {
			const filtered = originalTodos.filter((todo) =>
				String(todo.title).toLowerCase().includes(query.toLowerCase()),
			);
			setTodos(filtered);
		}
	};

	return (
		<div className={styles.app}>
			<h4>Поиск</h4>
			<input
				type="text"
				placeholder="Поиск дел"
				value={searchQuery}
				onInput={(e) => handleSearch(e.target.value)}
				className={styles.Input}
			/>

			<hr />

			<h4>Добавление задачи</h4>
			<input
				type="text"
				placeholder="Введите текст задачи"
				value={newTodo}
				onChange={(e) => setNewTodo(e.target.value)}
				className={styles.Input}
			/>
			<button onClick={requestAddTodo}>Добавить задачу</button>

			<hr />

			<h4>Изменить задачу</h4>
			<input
				type="text"
				placeholder="Введите id задачи"
				value={idForChangeTodo}
				onChange={(e) => setIdForChangeTodo(e.target.value)}
				className={styles.Input}
			/>
			<input
				type="text"
				placeholder="Введите новый текст"
				value={textForChangeTodo}
				onChange={(e) => setTextForChangeTodo(e.target.value)}
				className={styles.Input}
			/>
			<br />
			<label>
				<input
					type="checkbox"
					checked={completedStatus}
					onChange={(e) => setCompletedStatus(e.target.checked)}
				/>
				Отметить как выполнено?
			</label>
			<button onClick={requestUpdateTodo}>Изменить задачу</button>

			<hr />

			<button onClick={sortTodo}>
				{isSorted ? 'Выкл сортировку' : 'Вкл сортировку'}
			</button>

			{isLoading ? (
				<div className={styles.loader}></div>
			) : (
				todos.map(({ id, title, completed }) => (
					<div className={styles.todo} key={id}>
						<p>ID: {id}</p>
						<hr />
						<p>Задача: {title}</p>
						<hr />
						<p className={completed ? styles.green : styles.red}>
							Статус, выполнено? {completed ? 'true' : 'false'}
						</p>
						<button onClick={() => requestDeleteTodo(id)}>Удалить</button>
					</div>
				))
			)}
		</div>
	);
}

export default App;
