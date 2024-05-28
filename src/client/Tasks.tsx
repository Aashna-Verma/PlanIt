import { useState, useEffect } from "react";
import Task from "./model_interfaces/task.interface";

export default function Tasks(props: { readonly tasks: string[] }) {
	const [tasks, setTasks] = useState<Task[]>([]);

	useEffect(() => {
		const getTaskById = async (id: string) => {
			const response = await fetch(`/api/tasks/${id}`);
			return response.json();
		};

		const fetchTasks = async () => {
			const fetchedTasks = await Promise.all(props.tasks.map((task) => getTaskById(task)));
			setTasks(fetchedTasks);
		};

		fetchTasks();
	}, [props.tasks]);

	return (
		<ul>
			{tasks.map((task) => (
				<li key={task._id} className="truncate">{task.title}</li>
			))}
		</ul>
	);
}
