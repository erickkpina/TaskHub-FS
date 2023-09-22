import React, { useEffect, useState } from 'react'
import axios from 'axios';

import { useParams } from 'react-router-dom';

export const TaskDetail = () => {
    const { id } = useParams();
    const [task, setTask] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/todos/${id}/`);
                const data = response.data;
                setTask(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]); // O segundo argumento [] garante que isso só seja executado uma vez após a montagem

    return (
        <main className="flex items-center justify-center h-screen relative">
            <div className="max-w-sm p-6 w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 absolute top-20">
                <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{task.title}</h1>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{task.description}</p>
                <div className="flex flex-row mt-4 space-x-3 md:mt-6">
                    <p className="pt-1 text-md font-bold text-gray-500 dark:text-gray-400">Start date:</p>
                    <p className="pt-1 text-md text-gray-500 dark:text-gray-400">{task.start_date}</p>
                </div>
                <div className="flex flex-row space-x-3 ">
                    <p className=" text-md font-bold text-gray-500 dark:text-gray-400">Deadline:</p>
                    <p className=" text-md text-gray-500 dark:text-gray-400">{task.end_date}</p>
                </div>
            </div>
        </main>
    )
}
