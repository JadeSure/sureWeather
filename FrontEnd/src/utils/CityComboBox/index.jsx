import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { useState, useEffect } from 'react'


const baseUrl = process.env.REACT_APP_ENV === "productioin" ? process.env.REACT_APP_BASE_URL : process.env.REACT_APP_LOCAL_BASE_URL
export default function CityComboBox(props) {
    const { onStatusCodeBlur, city, fetchData } = props;
    const [stateCode, setStateCode] = useState()
    const [status, setStatus] = useState(false)
    try {
        const fetchData = async () => {
            const token = localStorage.getItem("token")
            const { data } = await axios.get(`${baseUrl}allWeathers/getStateCode`, { headers: { Authorization: `Bearer ${token}` } })


            setStateCode(data)
            setStatus(true)
        }

        useEffect(() => {
            fetchData()
        }, [])

    } catch (e) {
        console.log(e);
    }

    const handleOnChange = (e) => {
        if (e.target.value === '') return
        onStatusCodeBlur({ ...city, countryCode: e.target.value })
    }

    return (
        status ? <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={stateCode}
            onBlur={handleOnChange}
            renderInput={(params) => <TextField {...params} size="small" label="State Code" />}
        /> : ""
    );
}

// const top100Films = [
//     { label: 'The Shawshank Redemption', year: 1994 },
//     { label: 'The Godfather', year: 1972 },
//     { label: 'The Godfather: Part II', year: 1974 },
//     { label: 'The Dark Knight', year: 2008 },
//     { label: '12 Angry Men', year: 1957 },
//     { label: "Schindler's List", year: 1993 },
//     { label: 'Pulp Fiction', year: 1994 }
// ];