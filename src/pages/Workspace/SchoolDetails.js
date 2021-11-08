import React from 'react'
import { useLocation } from 'react-router'

const SchoolDetails = () => {

    const id = useLocation().state.id
    
    return (
        <div>
            <h1>School Details</h1>
        </div>
    )
}

export default SchoolDetails
