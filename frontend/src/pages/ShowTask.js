import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

export const ShowTask = () => {
    const [todoList, setTodoList] = useState([]);

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

    return (
        <main>
            <section className="p-5 rounded-lg m-5 mx-auto shadow-xl border  dark:border-gray-700">
                <div className="flex items-center justify-between pb-2 border-b border-gray-300">
                    <div>
                        <span className="text-xl font-semibold select-none text-black dark:text-white">Tasks</span>
                        <span className="bg-gray-300 text-gray-600 py-1 px-3 mx-2 rounded-full select-none">
                            {todoList.length}
                        </span>
                    </div>

                    <button type="button" class="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">Show completed</button>
                    <button type="button" class="hidden text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900">Show All</button>

                </div>
                <ul className="m-8 flex flex-wrap justify-center gap-5">
                    {todoList.map((task) => (
                        <li key={task.id} className="flex flex-row p-4 w-[400px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-700 dark:border-gray-700  relative">
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
            </section>
        </main>
    );
};
