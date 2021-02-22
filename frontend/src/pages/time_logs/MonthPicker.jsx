import React, { useState } from 'react'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { loadLogs } from '../../store/actions/timeLogActions';

const MonthPicker = () => {

    const dispatch = useDispatch()

    const [monthValue, setMonthValue] = useState(moment().format("YYYY-MM"))

    const handleChange = e => {
        const value = e.target.value
        if (JSON.stringify(value) !== JSON.stringify(monthValue)) {
            const date = moment(value)
            const filter = { year: date.year(), month: date.month() + 1 }
            dispatch(loadLogs(filter))
        }
        setMonthValue(value)
    }

    return (
        <div className="col text-right">
            <h3 className="mb-0">
                <input
                    type="month"
                    value={monthValue}
                    max={moment().format("YYYY-MM")}
                    onChange={handleChange}
                />
            </h3>
        </div>

    )

}


export default MonthPicker

