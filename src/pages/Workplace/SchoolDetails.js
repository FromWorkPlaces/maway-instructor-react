import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { BaseUrlSrc } from '../../Utility/BaseUrl'

const SchoolDetails = () => {

    const id = useLocation().state.id
    const config = {headers: {'Content-Type': 'application/json','role': 'instructor'}}

    const [school_details, setSchoolDetails] = useState({})
    const [note, setNote] = useState('Please accept me')
    const [type, setType] = useState('')
    const [applied_categories, setAppliedCategories] = useState([
        {
          "school_category_id": 62,
          "classroom": 1,
          "driving": 1,
          "external": 1
        },
        {
          "school_category_id": 63,
          "classroom": 1,
          "driving": 1,
          "external": 1
        },
        {
          "school_category_id": 64,
          "classroom": 1,
          "driving": 1,
          "external": 1
        }
      ])

    useEffect(() => {
        
        const getSchoolInfo = async () => {
            try {
                const res = await axios.get("/instructor/find-school/show", {params:{"school_id": id}}, config)

                console.log(res.data);
                if(res.data.success) {}
            } catch(err) {
                
            }
        }

        getSchoolInfo();
        
    }, [])

    const Apply = async () => {
        const data = {
            'school_id': id,
            'type': type,
            'apply_note': note,
            'applied_categories': applied_categories
        }
        try {
            const res = await axios.post("/instructor/find-school/apply", data, config)

            console.log(res.data);
            if(res.data.success) {
                setSchoolDetails(res.data.data)
            }
        } catch(err) {
            
        }
    }
    
    return (
        <div>
            <h1>School Details</h1>

            <img src={`${BaseUrlSrc}${school_details.cover_photo}`} alt="Girl in a jacket" width="500" height="200" />
            <h1>{school_details.school_name} | {school_details.rating}</h1>
            <p>phone number: {school_details.phone_number}</p>
            <p>website: {school_details.website}</p>
            <p>contact mail: {school_details.contact_mail}</p>
            <p>email: {school_details.email}</p>
            <p>zip: {school_details.zip}</p>
            <p>city: {school_details.city}</p>
            <p>address: {school_details.address}</p>
            <p>short description: {school_details.short_description}</p>
            <p>long description: {school_details.long_description}</p>

            <input type="radio" id="fulltime" name="type" value="fulltime" onChange={(e) => setType(e.target.value)} />
            <label for="fulltime">Fulltime</label>
            <input type="radio" id="freelancer" name="type" value="freelancer" onChange={(e) => setType(e.target.value)} />
            <label for="freelancer">Freelancer</label>

            <br/>
            <textarea onChange={(e) => setNote(e.target.value)} value={note} name="apply_note" rows="6" cols="50" />

            <br/>
            <button type="button" onClick={Apply}>Apply</button>
        </div>
    )
}

export default SchoolDetails
