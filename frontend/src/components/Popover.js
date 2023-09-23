import React, { useState, useEffect } from 'react'
import axios from "axios";
import { set } from 'date-fns';

export const Popover = ({ setTodoList, task }) => {
	const [hidden, setHidden] = useState(true);
	const [popoverVisible, setPopoverVisible] = useState(false);
	const [tempTask, setTempTask] = useState({
		title: '',
		description: '',
		completed: false,
		start_date: '',
		end_date: '',
	});

	const showPopover = () => {
		setPopoverVisible(true);
	};

	const hidePopover = () => {
		setPopoverVisible(false);
	};

	const fetchTasks = async () => {
		try {
			const response = await axios.get('http://localhost:8000/todos/');
			setTodoList(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchTasks();
	}, []);

	const handleEdit = async (id) => {
		if (task.id === id) {
			try {
				setTempTask({
					title: 'edited',
					description: 'testing',
					completed: true,
					start_date: '23/03/2023',
					end_date: '30/03/2023',
				});
				const response = await axios.put(`http://localhost:8000/todos/${task.id}/`, tempTask);
				console.log(response.data);

				fetchTasks();
			} catch (error) {
				console.error(error);
			}
		}
	};

	const handleToggleComplete = async () => {
		try {
			const updatedTask = { ...task, completed: !task.completed };
			setTempTask(updatedTask);

			const response = await axios.put(`http://localhost:8000/todos/${task.id}/`, updatedTask);
			console.log(response.data);

			fetchTasks();
		} catch (error) {
			console.error(error);
		}
	};

	const handleSubmit = item => {
		this.toggle();
		if (item.id) {

			return;
		}
		axios
			.post("http://localhost:8000/todos/", item)
	};

	const buttonClassName = task.completed
		? 'inline-flex items-center justify-center w-full px-5 py-2 mr-2 text-sm font-medium rounded-lg text-black hover:text-black hover:bg-yellow-400 border border-yellow-400 focus:ring-4 focus:outline-none focus:ring-yellow-400 dark:focus:ring-yellow-400 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-yellow-400'
		: 'inline-flex items-center justify-center w-full px-5 py-2 mr-2 text-sm font-medium rounded-lg text-green-700 hover:text-white hover:bg-green-400 border border-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-green-600';

	return (
		<div className="text-xs text-gray-700 dark:text-gray-400">
			<p
				data-popover-target="popover-company-profile"
				className="hover:text-blue-700 dark:hover:text-white"
				onMouseEnter={showPopover}
				onMouseLeave={hidePopover}
			>
				Read more...
			</p>
			{popoverVisible && (
				<div
					data-popover
					id="popover-company-profile"
					role="tooltip"
					className={`absolute z-10 inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm ${popoverVisible ? 'opacity-100' : 'opacity-0'
						} w-80 dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600`}
					onMouseEnter={showPopover}
					onMouseLeave={hidePopover}
				>
					<div className="p-3">
						<div className="flex">
							<div>
								<p className="mb-1 text-base font-semibold leading-none text-gray-900 dark:text-white">{task.title}</p>
								<div className="flex flex-row space-x-1 mt-2">
									<p className=" text-xs text-gray-500 dark:text-gray-400">Start:</p>
									<p className="text-xs text-gray-500 dark:text-gray-400">{task.start_date}</p>
								</div>
								<div className="flex flex-row space-x-1 mb-2">
									<p className="text-xs text-gray-500 dark:text-gray-400">Deadline:</p>
									<p className="text-xs text-gray-500 dark:text-gray-400">{task.end_date}</p>
								</div>
								<p className="my-6 text-md text-gray-900 dark:text-white">{task.description}</p>

								<div className="flex">
									<button onClick={handleToggleComplete} type="button" className={buttonClassName}>
										{task.completed ? 'Mark as incomplete' : 'Mark as completed'}
									</button>
									<button onClick={() => setHidden(!hidden)} id="dropdown-button" data-dropdown-toggle="dropdown-menu" className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shrink-0 focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
										<svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
											<path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
										</svg>
									</button>
								</div>
								<div id="dropdown-menu" className={`${hidden ? "hidden" : ""} z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
									<ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
										<li>
											<a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit Task</a>
										</li>
										<li>
											<a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete Task</a>
										</li>

									</ul>
								</div>
							</div>
						</div>
					</div>
					<div data-popper-arrow></div>
				</div>
			)}
		</div>

	)
}

export default Popover;
