import React, { useState } from 'react'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { loadLogs } from '../../store/actions/timeLogActions';
import { withRouter } from "react-router-dom";


const MonthPicker = ({match}) => {

    const dispatch = useDispatch()

    const [monthValue, setMonthValue] = useState(moment().format("YYYY-MM"))

    const handleChange = e => {
        const value = e.target.value
        if (JSON.stringify(value) !== JSON.stringify(monthValue)) {
            const date = moment(value)
            let filter = { year: date.year(), month: date.month() + 1 }
            if (match.params.userId){
                filter = {...filter, created_by: match.params.userId}
            }
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


export default withRouter(MonthPicker)

