import React, { useState, useEffect } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import DatePicker from 'react-datepicker'
import { AddTask } from './AddTask'

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

const tasks = [
    {
        title: 'Task 1',
        start: new Date(2023, 8, 4, 10, 0), // 1º de setembro de 2023 às 10:00 AM
        end: new Date(2023, 8, 4, 12, 0), // 1º de setembro de 2023 às 12:00 PM
    },
    {
        title: 'Task 2',
        start: new Date(2023, 8, 2, 14, 30), // 2 de setembro de 2023 às 14:30 (2:30 PM)
        end: new Date(2023, 8, 2, 15, 30), // 2 de setembro de 2023 às 15:30 (3:30 PM)
    },
    {
        title: 'Task 3',
        start: new Date(2023, 8, 2, 14, 30), // 2 de setembro de 2023 às 14:30 (2:30 PM)
        end: new Date(2023, 8, 2, 15, 30), // 2 de setembro de 2023 às 15:30 (3:30 PM)
    },
]


export const ScheduleComponent = () => {

    return (
        console.log(tasks),
        <div>
            <Calendar
                localizer={localizer}
                events={tasks}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500, margin: "50px" }}
            />
        </div>
    )
}

export default ScheduleComponent;
