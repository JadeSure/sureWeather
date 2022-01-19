// import React, { useState, useEffect } from 'react';
import { Typography, AppBar, Button, Toolbar, Grid } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import styles from './index.module.scss';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate()
    const logoutHandler = () => {
        localStorage.clear()
        navigate('/')
    }

    return (
        <div>

            <AppBar className={styles.container}>
                <Toolbar>

                    <WbSunnyIcon className={styles.icon} />
                    <Typography variant="h6">
                        Sure Weather App&nbsp;&nbsp;
                    </Typography>
                    <Typography variant="h6">
                        &nbsp;&nbsp;  Welcome, {localStorage.getItem('username') && localStorage.getItem('username').split('@')[0]}
                    </Typography>


                    <Button onClick={logoutHandler} className={styles.container__button}>
                        Logout
                    </Button>


                </Toolbar>
            </AppBar>
        </div >
    )
}