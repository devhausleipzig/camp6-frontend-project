import { CreateContext, Task, TaskProp } from "../types/TypesNConsts";
import { useTasks } from "../utilities/axios";
import { StarButton } from "./buttons/StarButton";
import { ACTIONS, useTasksDispatch, useTasksReducer } from "./TasksContext";

export function TaskListHome() {
	const tasks = useTasksReducer();

	if (!tasks.length) {
		return <p>Oops, looks like you haven't added anything yet</p>;
	}

	return (
		<div>
			<h3 className="card-heading">Upcoming Tasks</h3>
			<ul className="px-4 py-2">
				{tasks
					.sort(
						(a: Task, b: Task) => a.deadline.getTime() - b.deadline.getTime()
					)
					.filter((task) => !task.completed ?? false)
					.splice(0, 5)
					.map((task) => (
						<li
							key={task.id}
							className="flex h-9 items-center justify-between gap-2  rounded-md border-r border-b bg-white p-3"
						>
							<TaskItem task={task} />
						</li>
					))}
			</ul>
		</div>
	);
}

function TaskItem({ task }: TaskProp) {
	// I will probably need these here
	const dispatch = useTasksDispatch() as CreateContext;

	const date = JSON.stringify(task.deadline).slice(1, 11);

	return (
		<>
			<div className="flex h-full w-full flex-row items-center gap-5">
				<input
					type="checkbox"
					name="completed"
					onChange={() => {
						dispatch({ type: ACTIONS.COMPLETED, payload: { id: task.id } });
					}}
				/>

				<p className="text-xs">{task.name}</p>

				<p className="text-xs text-customTextColorLight ">Due: {date}</p>
			</div>
			<StarButton
				value={task.priority}
				clickHandler={() => {
					dispatch({
						type: ACTIONS.PRIORITY,
						payload: { id: task.id },
					});
				}}
			/>
		</>
	);
}
