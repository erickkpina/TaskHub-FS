import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Link, useNavigate } from 'react-router-dom';

export const ShowTask = () => {
    const [todoList, setTodoList] = useState([]);
    const [showCompleted, setShowCompleted] = useState(false);
    const navigate = useNavigate();

    const toggleShowCompleted = () => {
        setShowCompleted(!showCompleted);
    };

    function truncateText(text, maxLength) {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/todos/');
                const data = response.data;
                setTodoList(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []); // O segundo argumento [] garante que isso só seja executado uma vez após a montagem

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8000/todos/${id}`);
            const updatedTaskList = todoList.filter((t) => t.id !== id);
            setTodoList(updatedTaskList);

            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddTaskButtonClick = () => {
        navigate('/add_task');
    };

    return (
        <main>
            <section className="p-5 rounded-lg m-5 mx-auto shadow-xl border dark:border-gray-700">
                <div className="flex items-center justify-between pb-2 border-b border-gray-300">
                    <div>
                        <span className="text-xl font-semibold select-none text-black dark:text-white">Tasks</span>
                        <span className="bg-gray-300 text-gray-600 py-1 px-3 mx-2 rounded-full select-none">
                            {todoList.length}
                        </span>
                    </div>

                    <button type="button" onClick={handleAddTaskButtonClick} className="text-blue-700 hover:text-white bg-white border border-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">+ Add Task</button>


                    <div className='flex flex-col'>
                        <div className='py-1'>
                            <span className="bg-yellow-400 text-gray-600 px-3 mx-2 rounded-full" />
                            <span className="text-sm text-black dark:text-white">To do</span>
                        </div>

                        <div className='py-1'>
                            <span className="bg-green-500 text-gray-600 px-3 mx-2 rounded-full" />
                            <span className="text-sm text-black dark:text-white">Completed</span>
                        </div>
                    </div>

                </div>
                <ul className="m-8 flex flex-wrap justify-center gap-5">

                    {showCompleted
                        ? todoList
                            .filter((task) => task.completed)
                            .map((task) => (
                                <li
                                    key={task.id}
                                    className="flex flex-row p-4 w-[400px] bg-white border-l-8 border-green-500 rounded-lg shadow dark:bg-gray-700 relative"
                                >
                                    <div className="flex-grow flex flex-col">
                                        <span className="mb-2 text-lg  tracking-tight text-gray-900 dark:text-white">
                                            {truncateText(task.title, 25)}
                                        </span>
                                        <div className="text-xs text-gray-700 dark:text-gray-400">
                                            <p>{task.start_date} - {task.end_date}</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col justify-between'>
                                        <div>
                                            <i onClick={() => handleDelete(task.id)} className='bi bi-pencil-square pr-1 pl-8 text-blue-800 dark:text-white' style={{ cursor: 'pointer' }} />
                                            <i onClick={() => handleDelete(task.id)} className='bi bi-trash text-red-700 dark:text-white' style={{ cursor: 'pointer' }} />
                                        </div>
                                        <Link to={`/task/${task.id}`} >
                                            <div className="text-xs text-gray-700 dark:text-gray-400">
                                                <p className='hover:text-blue-700 dark:hover:text-white'>Read more...</p>
                                            </div>
                                        </Link>
                                    </div>
                                </li>
                            ))
                        : todoList.map((task) => (
                            <li
                                key={task.id}
                                className={`flex flex-row p-4 w-[400px]  bg-white rounded-lg shadow dark:bg-gray-700 relative ${task.completed ? 'border-l-8 border-green-500' : 'border-l-8 border-yellow-400'
                                    }`}
                            >
                                <div className="flex-grow flex flex-col">
                                    <span className="mb-2 text-lg  tracking-tight text-gray-900 dark:text-white">
                                        {truncateText(task.title, 25)}
                                    </span>
                                    <div className="text-xs text-gray-700 dark:text-gray-400">
                                        <p>{task.start_date} - {task.end_date}</p>
                                    </div>
                                </div>
                                <div className='flex flex-col justify-between'>
                                    <div>
                                        <i onClick={() => handleDelete(task.id)} className='bi bi-pencil-square pr-1 pl-8 text-blue-800 dark:text-white' style={{ cursor: 'pointer' }} />
                                        <i onClick={() => handleDelete(task.id)} className='bi bi-trash text-red-700 dark:text-white' style={{ cursor: 'pointer' }} />
                                    </div>
                                    <Link to={`/task/${task.id}`} >
                                        <div className="text-xs text-gray-700 dark:text-gray-400">
                                            <p className='hover:text-blue-700 dark:hover:text-white'>Read more...</p>
                                        </div>
                                    </Link>
                                </div>
                            </li>
                        ))}
                </ul>

                <button
                    type="button"
                    className={`${showCompleted
                        ? 'hidden'
                        : 'text-green-700 hover:text-white border border-green-600 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800'
                        }`}
                    onClick={toggleShowCompleted}
                >
                    Show completed
                </button>

                <button
                    type="button"
                    className={`${showCompleted
                        ? 'text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900'
                        : 'hidden'
                        }`}
                    onClick={toggleShowCompleted}
                >
                    Show All
                </button>

            </section>
        </main>
    );
};
