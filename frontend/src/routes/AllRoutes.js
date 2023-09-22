import { Routes, Route } from 'react-router-dom';
import { ShowTask, Schedule, TaskDetail, AddTask } from '../pages/Index';

export const AllRoutes = () => {
    return (
        <div className='dark:bg-darkbg'>
            <Routes>
                <Route path='/' element={<ShowTask />} />
                <Route path='schedule' element={<Schedule />} />
                <Route path='add_task' element={<AddTask />} />
                <Route path='task/:id' element={<TaskDetail />} />

            </Routes>
        </div>
    )
}
