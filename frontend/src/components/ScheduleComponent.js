import React, { useState, useEffect } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { parse } from 'date-fns';

import axios from 'axios'


const locales = {
    'en-US': require('date-fns/locale/en-US'),
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})


export const ScheduleComponent = () => {
    const [todoList, setTodoList] = useState([]);
    const [popoverVisible, setPopoverVisible] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/todos/');
            const data = response.data;

            // Atualize o formato das datas para serem aceitas pelo React Big Calendar
            const formattedData = data.map((task) => ({
                title: task.title,
                description: task.description,
                completed: task.completed,
                start: parse(task.start_date, "dd/MM/yyyy, HH:mm", new Date()), // Parse a data a partir da string
                end: parse(task.end_date, "dd/MM/yyyy, HH:mm", new Date()), // Parse a data a partir da string
            }));

            setTodoList(formattedData);
            console.log(todoList);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const eventPropGetter = (event) => {
        const eventStyle = {
            backgroundColor: event.completed ? 'green' : 'yellow',
            color: event.completed ? 'white' : 'black',
        };

        return {
            style: eventStyle,
        };
    };

    const handleSelectEvent = (event) => {
        event.start_date = format(event.start, "dd/MM/yyyy, HH:mm"); // Formate a data para ser exibida no popover
        event.end_date = format(event.end, "dd/MM/yyyy, HH:mm"); // Formate a data para ser exibida no popover
        setSelectedTask(event); // Define a tarefa selecionada

        setPopoverVisible(true); // Torna o popover visível
    };

    const closePopover = () => {
        setPopoverVisible(false);
    };

    return (
        <div>
            <div className='flex flex-row justify-center items-center'>
                <div className='py-3'>
                    <span className="bg-yellow-400 text-gray-600 px-3 mx-2 rounded-full" />
                    <span className="text-sm text-black dark:text-white">- To do</span>
                </div>

                <div className='py-1'>
                    <span className="bg-green-700 text-gray-600 px-3 mx-2 rounded-full" />
                    <span className="text-sm text-black dark:text-white">- Completed</span>
                </div>
            </div>
            <div>
                <Calendar
                    localizer={localizer}
                    events={todoList}
                    startAccessor="start"
                    endAccessor="end"
                    tooltipAccessor="description"
                    style={{ height: 750, marginTop: "20px", marginBottom: "40px" }}
                    eventPropGetter={eventPropGetter}
                    onSelectEvent={handleSelectEvent}
                    className="text-black bg-white border border-black focus:outline-none focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:border-gray-600"
                />
            </div>
            {popoverVisible && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div
                        data-popover
                        id="popover-company-profile"
                        role="tooltip"
                        className="absolute z-10 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm w-80 dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600"
                    >
                        <div className="p-3">
                            <button onClick={closePopover} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                                X
                            </button>
                            <p className="mb-1 text-base font-semibold leading-none text-gray-900 dark:text-white">{selectedTask.title}</p>

                            <p className="my-6 text-md text-gray-900 dark:text-white w-full">{selectedTask.description}</p>

                            <div className="flex flex-row space-x-1 mt-2">
                                <p className=" text-xs text-gray-500 dark:text-gray-400">Start:</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{selectedTask.start_date}</p>
                            </div>
                            <div className="flex flex-row space-x-1 mb-2">
                                <p className="text-xs text-gray-500 dark:text-gray-400">Deadline:</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{selectedTask.end_date}</p>
                            </div>
                        </div>
                        <div data-popper-arrow></div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ScheduleComponent;
