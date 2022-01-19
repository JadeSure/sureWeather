import React from 'react'
import { Grid, Typography } from '@mui/material';
import { Cloudy, Flurries as Snowy, Rainy, Sunny, Sunshower, Thunderstorm } from '../weatherIcon'
import styles from './index.module.scss'

export default function TodayWeather(props) {

    const { data, location } = props;

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

    return (
        <Grid item container spacing={2} className={styles.todayWeatherContainer}>
            <Grid item xs={8}>
                <Typography variant="h2" component="div" >
                    {location}
                </Typography>
            </Grid>
            <Grid item className={styles.todayWeatherContainer__icon} xs={4}>
                {pickIcon(data.weather[0].main)}
            </Grid>

            <Grid item xs={12}>
                <Typography variant="h4" color="text.secondary" >
                    {data.weather[0].main} : {data.weather[0].description}
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography variant="h6" color="text.secondary" >
                    Feeling temperature: {data.feels_like}°C
                </Typography>
            </Grid>

        </Grid >

    )
}
