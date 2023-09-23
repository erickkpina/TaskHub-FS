import React, { useEffect } from 'react'
import axios from 'axios';

import { Popover } from './Popover';


export const ToggleList = ({ task, handleDelete, fetchTasks }) => {

    function truncateText(text, maxLength) {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    }

    return (
        <li
            key={task.id}
            className={`flex flex-row p-4 w-[400px] bg-white rounded-lg shadow dark:bg-gray-700 relative ${task.completed ? 'border-l-8 border-green-500' : 'border-l-8 border-yellow-400'
                }`}
        >
            <div className="flex-grow flex flex-col">
                <span className="mb-2 text-lg tracking-tight text-gray-900 dark:text-white">
                    {truncateText(task.title, 25)}
                </span>
                <div className="text-xs text-gray-700 dark:text-gray-400">
                    <p>
                        {task.start_date} - {task.end_date}
                    </p>
                </div>
            </div>
            <div className="flex flex-col justify-between">
                <div>
                    <i
                        onClick={() => handleDelete(task.id)}
                        className="bi bi-pencil-square pr-1 pl-8 text-blue-800 dark:text-white"
                        style={{ cursor: 'pointer' }}
                    />
                    <i
                        onClick={() => handleDelete(task.id)}
                        className="bi bi-trash text-red-700 dark:text-white"
                        style={{ cursor: 'pointer' }}
                    />
                </div>
                <Popover task={task} fetchTasks={fetchTasks} />
            </div>
        </li>
    );
};


export default ToggleList;
