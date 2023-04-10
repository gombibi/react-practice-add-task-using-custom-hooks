import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHttp from '../Tasks/use-http';

const NewTask = (props) => {
	// const [isLoading, setIsLoading] = useState(false);
	// const [error, setError] = useState(null);

	// const enterTaskHandler = async (taskText) => {
	// 	setIsLoading(true);
	// 	setError(null);
	// 	try {
	// 		const response = await fetch('https://react-practice-fetch-movies-default-rtdb.firebaseio.com/tasks.json', {
	// 			method: 'POST',
	// 			body: JSON.stringify({ text: taskText }),
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 			},
	// 		});

	// 		if (!response.ok) {
	// 			throw new Error('Request failed!');
	// 		}

	// 		const data = await response.json();

	// 		const generatedId = data.name; // firebase-specific => "name" contains generated id
	// 		const createdTask = { id: generatedId, text: taskText };

	// 		props.onAddTask(createdTask);
	// 	} catch (err) {
	// 		setError(err.message || 'Something went wrong!');
	// 	}
	// 	setIsLoading(false);
	// };

	//custom Hook 사용
	const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();

	const createdTask = (taskText, taskData) => {
		const generatedId = taskData.name; // firebase-specific => "name" contains generated id
		const createdTask = { id: generatedId, text: taskText };

		props.onAddTask(createdTask);
	};

	const enterTaskHandler = async (taskText) => {
		const requestConfig = {
			url: 'https://react-practice-fetch-movies-default-rtdb.firebaseio.com/tasks.json',
			method: 'POST',
			body: { text: taskText },
			headers: {
				'Content-Type': 'application/json',
			},
		};

		//bind 메소드는 함수를 사전에 구성할 수 있게 해줌
		//호출 즉시 함수가 실행되지 않음
		sendTaskRequest(requestConfig, createdTask.bind(null, taskText));
	};
	return (
		<Section>
			<TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
			{error && <p>{error}</p>}
		</Section>
	);
};

export default NewTask;
