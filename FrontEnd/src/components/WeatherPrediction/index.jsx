import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Box, TextField, Grid, Button, Typography, Link } from '@mui/material';
import styles from './index.module.scss';
import axios from 'axios'
import WeatherComponent from './weatherComponent.jsx'
import TodayWeather from './todayWeather.jsx';
import RainBarChart from '../RainBarChart'
import CityComboBox from '../../utils/CityComboBox'
import { useNavigate } from 'react-router-dom';
import Header from '../Header'


import { Cloudy, Flurries as Snowy, Rainy, Sunny, Sunshower, Thunderstorm } from '../weatherIcon'

const baseUrl = process.env.REACT_APP_ENV === "production" ? process.env.REACT_APP_BASE_URL : process.env.REACT_APP_LOCAL_BASE_URL

let isRain = false;
const WallPaper = styled('div')({
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    overflow: 'hidden',
    background: 'linear-gradient(rgb(255, 38, 142) 0%, rgb(255, 105, 79) 100%)',
    transition: 'all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s',
    '&:before': {
        content: '""',
        width: '140%',
        height: '140%',
        position: 'absolute',
        top: '-40%',
        right: '-50%',
        background:
            'radial-gradient(at center center, rgb(62, 79, 249) 0%, rgba(62, 79, 249, 0) 64%)',
    },
    '&:after': {
        content: '""',
        width: '140%',
        height: '140%',
        position: 'absolute',
        bottom: '-50%',
        left: '-30%',
        background:
            'radial-gradient(at center center, rgb(247, 237, 225) 0%, rgba(247, 237, 225, 0) 70%)',
        transform: 'rotate(30deg)',
    },
});

const Widget = styled('div')(({ theme }) => ({
    padding: 10,
    borderRadius: 16,
    width: 500,
    maxWidth: '100%',
    // height: '70vh',
    margin: 'auto',
    position: 'relative',
    zIndex: 1,
    backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.4)',
    backdropFilter: 'blur(40px)',
}));

const pickIcon = (data) => {
    switch (data.weather[0].main.toString()) {

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


export default function WeatherPrediction() {
    const [city, setCity] = useState({
        cityName: 'Melbourne',
        countryCode: 'au'
    })
    const [weatherData, setWeatherData] = useState({})
    const [open, setOpen] = useState(false)
    const [error, setError] = useState(false)
    const [flag, setFlag] = useState(false)
    const navigate = useNavigate()


    const fetchData = async () => {

        const token = localStorage.getItem("token")

        let url = ''
        if (city.countryCode === '') {
            url = `${baseUrl}allWeathers/${city.cityName}`
        } else {
            url = `${baseUrl}allWeathers/${city.cityName}&${city.countryCode}`
        }
        try {
            const { data } = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } })


            isRain = data.current.weather[0].main !== 'Clear' && data.minutely !== 'undefined' ? true : false
            setWeatherData(data)
            setFlag(true)
            setError(false)
        } catch (error) {
            if (error.response.data === "Unauthorized") {
                navigate('/login')
            }
            // console.log(error.response.data.message);
            setError(true)
        }
    }

    useEffect(() => {
        fetchData()
    }, [city])


    const cityNameBlur = (e) => {
        if (e.target.value === '') return
        setCity({ ...city, cityName: capitalize(e.target.value) })

    }

    function capitalize(s) {
        return s[0].toUpperCase() + s.slice(1);
    }

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false);
    };



    return (
        <Box>
            <Header />
            <Box sx={{ width: '100%', overflow: 'hidden', paddingTop: 10 }}>

                <Grid container className={styles.container} direction="column" column={12}>

                    <Widget>


                        <Grid container direction="row" column={12} spacing={1} className={styles.container__textfiled}>
                            <Grid item xs={4}>
                                <TextField
                                    label="City Name"
                                    placeholder="Search"
                                    onBlur={cityNameBlur}
                                    size="small"
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <CityComboBox onStatusCodeBlur={setCity} city={city} fetchData={fetchData} />
                            </Grid>




                        </Grid>
                        {
                            error ?
                                <Typography variant="h6" className={styles.container__error}>
                                    Wrong City Name or State Code
                                </Typography> : ""
                        }

                        {
                            flag ?
                                <Grid item container spacing={1} direction="row" justifyContent="center" alignItems="center">

                                    <Grid item xs={12}>
                                        <TodayWeather data={weatherData.current} location={city.cityName} />
                                    </Grid>
                                    <Grid item>
                                        <Grid container spacing={1} direction="row" justifyContent="center" alignItems="center">
                                            {
                                                weatherData.daily.map((e, i) => {
                                                    return <Grid key={i} item xs={3}>
                                                        <WeatherComponent weatherData={e} category={e.weather[0].main} />
                                                    </Grid>
                                                })
                                            }
                                        </Grid>
                                    </Grid>
                                    {
                                        isRain &&
                                        <Grid item align="center">
                                            <Button variant="outlined" onClick={handleClickOpen} className={styles.container__button}>
                                                Rainfall Precipitation Per Minute
                                            </Button>
                                            <RainBarChart data={weatherData} open={open} onClose={handleClose} />
                                        </Grid>
                                    }
                                </Grid> : ""
                        }
                    </Widget>

                </Grid >
                <WallPaper />
            </Box >
        </Box>

    );
}