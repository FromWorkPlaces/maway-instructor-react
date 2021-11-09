import axios from 'axios'
import React, { useEffect, useState } from 'react'

const AddSchedule = () => {

    const [expertise, setExpertise] = useState([])
    const [selected_expertise, setSelectedCategory] = useState(null)
    const [is_recurring, setIsRecurring] = useState(false)
    const [start_date, setStartDate] = useState('')
    const [end_date, setEndDate] = useState('')
    const [start_time, setStartTime] = useState('')
    const [end_time, setEndTime] = useState('')
    const [days, setDays] = useState([])
    const [times, setTime] = useState([])
    
    const config = {headers: {'Content-Type': 'application/json','role': 'instructor'}}

    useEffect(() => {
        const getInstructorExpertise = async () => {
            try {
                const res = await axios.post("/instructor/profile/index", '', config)

                console.log(res.data);
                if(res.data.success) {
                    setExpertise(res.data.data[0].expertise)
                }
            } catch(err) {
                console.log(err);
            }
        }

        getInstructorExpertise();
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        console.log(expertise);
        console.log(selected_expertise);
        console.log(start_date);
        console.log(end_date);
        console.log(days);
        console.log(times);
    }, [expertise, selected_expertise, start_date, end_date, days, times])


    const AddTime = async () => {
        const data = {
            'start_date': start_date,
            'end_date': end_date,
            'start_time': start_time,
            'end_time': end_time,
            'days': days,
        }
        try {
            const res = await axios.get("/instructor/schedule/check", {params: data}, config)

            console.log(res.data);
            if(res.data.success) {
                setTime([...times, {
                    'start_time': start_time,
                    'end_time': end_time,
                    'days': days
                }])
            }
        } catch(err) {
            
        }
    }
    const Submit = async () => {
        const data = {
            'ins_exp_id': selected_expertise,
            'is_recurring': is_recurring,
            'start_date': start_date,
            'end_date': end_date,
            'times': times,
        }
        try {
            const res = await axios.post("/instructor/schedule/add", data, config)

            console.log(res.data);
            if(res.data.success) {}
        } catch(err) {
            
        }
    }


    const selectDeselectDays = (day) => {
        if(days.includes(day)) {
            setDays(days.filter(i => i !== day))
        } else {
            setDays([...days, day])
        }
    }
    
    return (
        <div>
            <h1>Add Schedule</h1>

            <input type="checkbox" onChange={(e) => setIsRecurring(!is_recurring)} id="is_recurring" /><label htmlFor="is_recurring">Is Recurring</label><br/><br/>
            
            {expertise && expertise.map((expertise_i) => <button
                key={expertise_i.expertise_id}
                className={expertise_i.expertise_id === selected_expertise ? 'border' : ''}
                onClick={() => setSelectedCategory(expertise_i.expertise_id)}>
                {expertise_i.category_name}
            </button>)}

            <p>Start Time: <input type="time" onChange={(e) => setStartTime(e.target.value)} /></p>
            <p>End Time: <input type="time" onChange={(e) => setEndTime(e.target.value)} /></p>

            <input type="checkbox" onChange={() => selectDeselectDays('mon')} id='mon'/><label htmlFor='mon'>M</label>
            <input type="checkbox" onChange={() => selectDeselectDays('tue')} id='tue'/><label htmlFor='tue'>T</label>
            <input type="checkbox" onChange={() => selectDeselectDays('wed')} id='wed'/><label htmlFor='wed'>W</label>
            <input type="checkbox" onChange={() => selectDeselectDays('thu')} id='thu'/><label htmlFor='thu'>T</label>
            <input type="checkbox" onChange={() => selectDeselectDays('fri')} id='fri'/><label htmlFor='fri'>F</label>
            <input type="checkbox" onChange={() => selectDeselectDays('sat')} id='sat'/><label htmlFor='sat'>S</label>
            <input type="checkbox" onChange={() => selectDeselectDays('sun')} id='sun'/><label htmlFor='sun'>S</label>

            <br/>
            <button type="button" onClick={AddTime}>Add Time</button>

            <p>Start Time: <input type="date" onChange={(e) => setStartDate(e.target.value)} /></p>
            <p>End Time: <input type="date" onChange={(e) => setEndDate(e.target.value)} /></p>

            <br/>
            <button type="button" onClick={Submit}>Submit</button>

            <ul>
                {times.map(time => <li>{time.start_time} : {time.end_time}</li>)}
            </ul>
        </div>
    )
}

export default AddSchedule
