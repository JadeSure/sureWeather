import { TextField, Typography, CardActionArea, CardMedia, Card, Grid, Paper, Button, CardContent } from '@mui/material';
import styles from './index.module.scss';
import axios from 'axios';
import react, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Dizzle from '../../assets/images/drizzle.jpeg'
import Clear from '../../assets/images/clear.jpeg'
import Clouds from '../../assets/images/clouds.jpeg'
import Rain from '../../assets/images/rain.jpeg'
import Snow from '../../assets/images/snow.jpeg'
import Thunderstorm from '../../assets/images/thunderstorm.jpeg'


let imagStyle = {
    backgroundImage: ''
}
const baseUrl = process.env.REACT_APP_ENV === "productioin" ? process.env.REACT_APP_BASE_URL : process.env.REACT_APP_LOCAL_BASE_URL

export default function CurrentWeather() {

    const [city, setCity] = useState({
        cityName: 'melbourne',
        countryCode: ''
    })
    const [weatherData, setWeatherData] = useState({})
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString())
    const [flag, setFlag] = useState(false)
    const navigate = useNavigate();


    const imageUrl = (status) => {
        switch (status) {
            case 'Clear':
                imagStyle = { ...imagStyle, backgroundImage: `url(${Clear})` }
                break
            case 'Drizzle':
                imagStyle = { ...imagStyle, backgroundImage: `url(${Dizzle})` }
                break
            case 'Clouds':
                imagStyle = { ...imagStyle, backgroundImage: `url(${Clouds})` }
                break
            case 'Rain':
                imagStyle = { ...imagStyle, backgroundImage: `url(${Rain})` }
                break
            case 'Snow':
                imagStyle = { ...imagStyle, backgroundImage: `url(${Snow})` }
                break
            case 'Thunderstorm':
                imagStyle = { ...imagStyle, backgroundImage: `url(${Thunderstorm})` }
                break
        }
    }

    const fetchData = async () => {
        let url = ''
        if (city.countryCode === '') {
            url = `${baseUrl}weathers/${city.cityName}`
        } else {
            url = `${baseUrl}weathers/${city.cityName}&${city.countryCode}`
        }

        const { data } = await axios.get(url)
        imageUrl(data.weather[0].main)


        setWeatherData(data)
        setFlag(true)
    }


    const onCityNameChange = (e) => {
        setCity({ ...city, cityName: e.target.value })
    }


    const cityNameBlur = () => {
        fetchData()
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString())
            // console.log("running", new Date().toLocaleTimeString());
        }, 1000)

        return () => {
            clearInterval(timer)
            // console.log("cleaning", new Date().toLocaleTimeString());
        }
    }, [])

    return (
        <div>
            <Button className={styles.loginButton} onClick={() => {
                navigate("/login");
            }}>Login</Button>

            {
                flag ?
                    <Grid className={styles.container} style={imagStyle} >
                        <Paper elevation={3} className={styles.currentWeatherPaper}>
                            <TextField
                                label="City Name"
                                placeholder="Search"
                                margin="normal"
                                className={styles.currentWeatherCity, styles.paperDark}
                                onChange={onCityNameChange}
                                onBlur={cityNameBlur}
                                size="small"

                            />

                            <Typography variant="h5" component="div" style={{ textAlign: 'right' }}
                                className={weatherData.weather[0].main === 'Thunderstorm' || weatherData.weather[0].main === 'Clouds' ? styles.paperDark : styles.paperLight}>
                                {weatherData.localDate} -  {currentTime}
                            </Typography>
                            <Typography variant="h2" component="div" className={weatherData.weather[0].main === 'Thunderstorm' || weatherData.weather[0].main === 'Clouds' ? styles.paperDark : styles.paperLight}>
                                {weatherData.location}
                            </Typography>
                            <Typography variant="h3" color="text.secondary" className={weatherData.weather[0].main === 'Thunderstorm' || weatherData.weather[0].main === 'Clouds' ? styles.paperDark : styles.paperLight}>
                                {weatherData.weather[0].main} : {weatherData.weather[0].description}
                            </Typography>
                            <Typography variant="h6" color="text.secondary" className={weatherData.weather[0].main === 'Thunderstorm' || weatherData.weather[0].main === 'Clouds' ? styles.paperDark : styles.paperLight}>
                                temperature: {weatherData.main.temp}°C
                            </Typography>
                            <Typography variant="h6" color="text.secondary" className={weatherData.weather[0].main === 'Thunderstorm' || weatherData.weather[0].main === 'Clouds' ? styles.paperDark : styles.paperLight}>
                                Feeling temperature: {weatherData.main.feels_like}°C
                            </Typography>

                        </Paper>
                    </Grid >
                    : ''
            }
        </div >
    )
}