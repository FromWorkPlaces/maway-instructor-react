import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const FindSchool = () => {

    const [cities, setCities] = useState([])
    const [categories, setCategories] = useState([])
    const [schools, setSchools] = useState([])

    const [selected_cities, setSelectedCities] = useState([])
    const [selected_categories, setSelectedCategories] = useState([])
    const [selected_rates, setSelectedRates] = useState([])

    const config = {headers: {'Content-Type': 'application/json','role': 'instructor'}}

    useEffect(() => {
        
        const getFilterOptions = async () => {
            try {
                const res = await axios.get("/common/find-school/get-filter-options", '', config)

                console.log(res.data);
                if(res.data.success) {
                    setCategories(res.data.data.categories);
                    setCities(res.data.data.cities);
                    filterSchool()
                }
            } catch(err) {
                console.log(err);
            }
        }

        getFilterOptions();
        
    }, [])

    useEffect(() => {
        console.log(selected_cities, 'selected_cities');
        console.log(selected_categories, 'selected_categories');
        console.log(selected_rates, 'selected_rates');
        console.log(schools, 'schools');
    }, [selected_cities, selected_categories, selected_rates])

    const filterSchool = async () => {
        try {
            const data = {
                "search": "s",
                "cities": selected_cities,
                "categories": selected_categories,
                "rate": selected_rates
            }

            try {
                const res = await axios.get('/common/find-school/index', { params: data}, config)
                console.log(res.data);
                if(res.data.success) {
                    setSchools(res.data.data)
                }
            } catch(err) {
                console.log(err);
            }
        } catch(err) {
            console.log(err);
        }
    }

    const submitForm = (e) => {
        e.preventDefault();
        filterSchool()
    }

    return (
        <div>
            <h1>Find School</h1>

            <form onSubmit={submitForm}>
                {cities && <select name="city" onChange={(e) => setSelectedCities([...selected_cities, e.target.value])}>
                    {cities.map((city) => <option disabled={selected_cities.includes(`${city.name}`)} key={city.id} value={city.name}>{city.name}</option>)}
                </select>} &nbsp;

                {categories && <select name="cars" onChange={(e) => setSelectedCategories([...selected_categories, e.target.value])}>
                    {categories.map((category) => <option disabled={selected_categories.includes(`${category.id}`)} key={category.id} value={category.id}>{category.name}</option>)}
                </select>}

                <input onClick={((e) => setSelectedRates([...selected_rates, e.target.value]))} disabled={selected_cities.includes('3.5')} type="checkbox" id="3.5" name="3.5" value="3.5" />
                <label htmlFor="3.5">3.5</label>
                <input onClick={((e) => setSelectedRates([...selected_rates, e.target.value]))} disabled={selected_cities.includes('4')} type="checkbox" id="4.0" name="4.0" value="4" />
                <label htmlFor="4.0">4.0</label>
                <input onClick={((e) => setSelectedRates([...selected_rates, e.target.value]))} disabled={selected_cities.includes('5')} type="checkbox" id="5.0" name="5.0" value="5" />
                <label htmlFor="5.0">5.0</label>

                &nbsp;&nbsp;
                <button type="submit">Submit</button>
            </form>


            <h1>Schools</h1>
            <ul>
                {schools && schools.map((school) => <li key={school.id}>
                    
                    <p><Link to={{ pathname: '/school_details', state: { id: school.id} }}>{school.name}</Link> | {school.rate}</p>
                    <p>{school.city} | {school.address} | {school.zip}</p>
                </li>)}
            </ul>
        </div>
    )
}

export default FindSchool
