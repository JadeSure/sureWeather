import React from 'react'
import { Cloudy, Flurries as Snowy, Rainy, Sunny, Sunshower, Thunderstorm } from '../weatherIcon'
import styles from './index.module.scss'
import ModeNightIcon from '@mui/icons-material/ModeNight';
import LightModeIcon from '@mui/icons-material/LightMode';
import FlareIcon from '@mui/icons-material/Flare';


export default function weatherComponent(props) {

    const { weatherData, category } = props

    const weekDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const dayIndex = new Date(weatherData.dt * 1000).getDay()


    const pickIcon = (cate) => {
        switch (cate) {

            case 'Clear':
                return <Sunny />
            case 'Rain':
                return <Rainy />
            case 'Clouds':

                return <Cloudy />
            case 'Thunderstorm':
                return <Thunderstorm />
            case 'Snow':
                return <Snowy />
        }
    }

    function createData(type, temp) {
        return { type, temp }
    }

    const rows = [
        createData(<LightModeIcon />, weatherData.feels_like.day),
        createData(<ModeNightIcon />, weatherData.feels_like.night),
    ]


    let index = 0

    return (
        <div className={styles.weatherContainer}>

            <table>
                <thead>


                    <tr>
                        <th colSpan="2"> {weekDay[dayIndex]}</th>
                    </tr>
                    <tr>
                        <th className={styles.weatherContainer__tableRow} colSpan="2"> {pickIcon(category)}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        rows.map(e => {
                            return <tr key={index++}>
                                <td>{e.type}</td>
                                <td>{e.temp}°C</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div >
    )
}


