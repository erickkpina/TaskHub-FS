import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { AddTask } from '../components/AddTask';
import { ToggleList } from '../components/ToggleList';

export const ShowTask = () => {
    const [todoList, setTodoList] = useState([]);
    const [showTodoOnly, setShowTodoOnly] = useState(false);

    const toggleShowTodoOnly = () => {
        setShowTodoOnly(!showTodoOnly);
    };

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/todos/');
            const data = response.data;

            // Ordenar a lista com base na string de data (formato dd/MM/yyyy)
            data.sort((a, b) => {
                const dateA = a.start_date;
                const dateB = b.start_date;

                // Converter as strings de data em um formato que possa ser ordenado
                const datePartsA = dateA.split('/').reverse().join('');
                const datePartsB = dateB.split('/').reverse().join('');

                // Compare as strings de data convertidas
                if (datePartsA < datePartsB) {
                    return -1;
                }
                if (datePartsA > datePartsB) {
                    return 1;
                }
                return 0;
            });

            setTodoList(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {

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
            <section className="p-5 rounded-lg m-5 mx-auto shadow-xl border dark:border-gray-700">
                <div className="flex items-center justify-between pb-2 border-b border-gray-300">
                    <div>
                        <span className="text-xl font-semibold select-none text-black dark:text-white">Tasks</span>
                        <span className="bg-gray-300 text-gray-600 py-1 px-3 mx-2 rounded-full select-none">
                            {todoList.length}
                        </span>
                    </div>

                    <AddTask setTodoList={setTodoList} fetchTasks={fetchData} />

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
                    {showTodoOnly
                        ? todoList
                            .filter((task) => !task.completed)
                            .map((task) => (
                                <ToggleList key={task.id} task={task} handleDelete={handleDelete} fetchTasks={fetchData} />
                            ))
                        : todoList.map((task) => (
                            <ToggleList key={task.id} task={task} handleDelete={handleDelete} fetchTasks={fetchData} />
                        ))}
                </ul>

                <button
                    type="button"
                    className={`${showTodoOnly
                        ? 'hidden'
                        : 'font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 text-black hover:text-black hover:bg-yellow-400 border border-yellow-400 focus:ring-4 focus:outline-none focus:ring-yellow-400 dark:focus:ring-yellow-400 dark:bg-gray-800 dark:text-yellow-400 dark:border-yellow-400 dark:hover:text-black dark:hover:bg-yellow-400'
                        }`}
                    onClick={toggleShowTodoOnly}
                >
                    Show to do tasks
                </button>

                <button
                    type="button"
                    className={`${showTodoOnly
                        ? 'text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900'
                        : 'hidden'
                        }`}
                    onClick={toggleShowTodoOnly}
                >
                    Show All
                </button>

            </section>
        </main>
    );
};
