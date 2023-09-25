import React, { useState, useEffect } from 'react'
import axios from "axios";
import { set } from 'date-fns';

export const Popover = ({ task, fetchTasks }) => {
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
		? 'w-full px-5 py-2 mr-2 text-sm font-medium rounded-lg text-black hover:text-black hover:bg-yellow-400 border border-yellow-400 focus:ring-4 focus:outline-none focus:ring-yellow-400 dark:focus:ring-yellow-400 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-yellow-400'
		: 'w-full px-5 py-2 mr-2 text-sm font-medium rounded-lg text-green-700 hover:text-white hover:bg-green-600 border border-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-green-600';

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
					className={`absolute z-10 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm ${popoverVisible ? 'opacity-100' : 'opacity-0'
						} w-80 dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600`}
					onMouseEnter={showPopover}
					onMouseLeave={hidePopover}
				>
					<div className="p-3">
						<p className="mb-1 text-base font-semibold leading-none text-gray-900 dark:text-white">{task.title}</p>

						<p className="my-6 text-md text-gray-900 dark:text-white w-full">{task.description}</p>

						<div className="flex flex-row space-x-1 mt-2">
							<p className=" text-xs text-gray-500 dark:text-gray-400">Start:</p>
							<p className="text-xs text-gray-500 dark:text-gray-400">{task.start_date}</p>
						</div>
						<div className="flex flex-row space-x-1 mb-2">
							<p className="text-xs text-gray-500 dark:text-gray-400">Deadline:</p>
							<p className="text-xs text-gray-500 dark:text-gray-400">{task.end_date}</p>
						</div>
						<button onClick={handleToggleComplete} type="button" className={buttonClassName}>
							{task.completed ? 'Mark as not completed' : 'Mark as completed'}
						</button>
					</div>
					<div data-popper-arrow></div>
				</div>
			)}
		</div>

	)
}

export default Popover;
