import React, { useState } from 'react'
import axios from "axios";
import 'react-datepicker/dist/react-datepicker.css'

import DatePicker from 'react-datepicker'


export const AddTask = ({ setTodoList, fetchTasks }) => {
    const [hidden, setHidden] = useState(true);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);


    const [task, setTask] = useState({
        title: '',
        description: '',
        completed: false,
        start_date: '',
        end_date: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:8000/todos/', task);
            fetchTasks();

            setTask({
                title: '',
                description: '',
                completed: false,
                start_date: '',
                end_date: '',
            });
            setStartDate(null);
            setEndDate(null);
            setHidden(!hidden);

            console.log(task);
        } catch (error) {
            console.error(error);
        }
    };

    const closeModal = () => {
        setHidden(true);
    };

    return (
        <div >
            <button type="button" onClick={() => setHidden(!hidden)} className="text-blue-700 hover:text-white bg-white border border-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" >+ Add Task</button>
            {hidden ? null : (
                <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center bg-black bg-opacity-60">
                    <div id="authentication-modal" aria-hidden="true" className="relative w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button type="button" onClick={closeModal} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="px-6 py-6 lg:px-8">
                                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Create your Task</h3>
                                <form className="space-y-6" onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="taskTitle" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">What you need to do?</label>
                                        <input type="text" name="title" id="title" maxLength={80} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Math homework" required />
                                    </div>
                                    <div>
                                        <label htmlFor="taskDescription" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Give the task a description</label>
                                        <textarea name="description" id="description" onChange={handleChange} placeholder="Start on page 47 of the book" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
                                    </div>
                                    <div className='flex flex-row justify-center'>
                                        <div className='pr-3'>
                                            <label htmlFor="start_date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start date</label>
                                            <DatePicker
                                                name="start_date"
                                                id="start_date"
                                                selected={startDate}
                                                onChange={(date) => {
                                                    const formattedDate = date ? date.toLocaleString('pt-BR', {
                                                        year: 'numeric',
                                                        month: '2-digit',
                                                        day: '2-digit',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    }) : '';
                                                    setStartDate(date);
                                                    handleChange({ target: { name: "start_date", value: formattedDate } });
                                                }}
                                                dateFormat="dd/MM/yyyy HH:mm"
                                                showTimeSelect
                                                timeFormat="HH:mm"
                                                timeIntervals={5}
                                                timeCaption="Time"
                                                autoComplete='off'
                                                isClearable
                                                placeholderText="Select a start date"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                required
                                            />
                                        </div>
                                        <div className='pl-3'>
                                            <label htmlFor="end_date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End date</label>
                                            <DatePicker
                                                name="end_date"
                                                id="end_date"
                                                selected={endDate}
                                                onChange={(date) => {
                                                    const formattedDate = date ? date.toLocaleString('pt-BR', {
                                                        year: 'numeric',
                                                        month: '2-digit',
                                                        day: '2-digit',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    }) : '';
                                                    setEndDate(date);
                                                    handleChange({ target: { name: "end_date", value: formattedDate } });
                                                }}
                                                dateFormat="dd/MM/yyyy HH:mm"
                                                showTimeSelect
                                                timeFormat="HH:mm"
                                                timeIntervals={5}
                                                timeCaption="Time"
                                                autoComplete='off'
                                                isClearable
                                                placeholderText="Select an end date"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className='flex justify-center'>
                                        <button type="submit" className="w-48 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Task</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AddTask
