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
        <main>
            <section className="flex justify-center py-5 text-center">
                <div className="max-w-2xl text-black text-lg dark:text-white mx-auto my-auto">
                    <h1 className="text-4xl my-3 text-center">{task.title}</h1>
                    <p className="my-4 text-md text-gray-800 dark:text-gray-400">{task.description}</p>
                    <div className="flex flex-row mt-4 space-x-3 md:mt-6">
                        <p className="pt-1 text-sm font-bold text-gray-500 dark:text-gray-400">Start date:</p>
                        <p className="pt-1 text-sm text-gray-500 dark:text-gray-400">{task.start_date}</p>
                    </div>
                    <div className="flex flex-row space-x-3">
                        <p className="text-sm font-bold text-gray-500 dark:text-gray-400">Deadline:</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{task.end_date}</p>
                    </div>
                </div>
            </section>
        </main>
    )
}
