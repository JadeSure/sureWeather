import React, { useState, useCallback } from 'react';
import { Snackbar, Grid, Paper, Avatar, TextField, FormControlLabel, Checkbox, Button, Typography, Link, Alert } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock';
import styles from './index.module.scss';
import _debounce from 'lodash/debounce'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const baseUrl = process.env.REACT_APP_ENV === "productioin" ? process.env.REACT_APP_BASE_URL : process.env.REACT_APP_LOCAL_BASE_URL
const SignUp = () => {
    const [username, setUsername] = useState()
    const [open, setOpen] = useState(false)
    const [password, setPassword] = useState()
    const [errors, setErrors] = useState({
        usernameError: '',
        passwordError: '',
        rePasswordError: '',
        slideBarError: ''
    })
    let navigate = useNavigate();
    // const [validateStatus, setValidateStatus] = useState(false)

    const onUsernameChange = (e) => {
        setUsername(e.target.value)
        setErrors({ ...errors, usernameError: "" })
    }
    const onPasswordChange = (e) => {
        setPassword(e.target.value)
        setErrors({ ...errors, passwordError: "" })
    }

    const handleClose = () => setOpen(false)
    const usernameBlur = () => {
        const reg = new RegExp(/^\S+@\S+\.\S+$/).test(username)

        if (!username) {
            setErrors({ ...errors, usernameError: 'user name shouldnt be none' })

        } else if (!reg) {
            setErrors({ ...errors, usernameError: 'please input valid email address' })
        }
    }

    const passwordBlur = () => {
        if (!password) {
            setErrors({ ...errors, passwordError: 'password shouldnt be none' })
        }
    }

    const rePasswordBlur = (e) => {
        if (!e.target.value) {
            setErrors({ ...errors, rePasswordError: 'password shouldnt be none' })
            return
        }
        if (e.target.value !== password) {
            setErrors({ ...errors, rePasswordError: 'password should be same as the previous one' })
            return
        }
        setErrors({ ...errors, rePasswordError: '' })
    }

    const handleDebounceFn = async (username, password) => {
        try {

            if (errors.usernameError.length !== 0 || errors.passwordError.length !== 0) return
            if (!username || !password) return

            const res = await axios.post(`${baseUrl}registerUsers`,
                {
                    username,
                    password
                })

            console.log(res);

            navigate("/")
        } catch (e) {
            setOpen(true)
            console.log(e);
        }
    }

    const debounceFn = useCallback(_debounce(handleDebounceFn, 300), [])
    const submitHandler = () => {
        debounceFn(username, password)
    }

    return (
        <Grid>
            <Paper elevation={10} className={styles.signPaper}>

                <Grid align="center">
                    <Avatar>
                        <LockIcon color="success" />
                    </Avatar  >
                    <h2>Sign up</h2>
                </Grid>

                <TextField
                    required
                    label="Email address"
                    placeholder="Enter Username(email)"
                    margin="normal"
                    onChange={onUsernameChange}
                    onBlur={usernameBlur}
                    fullWidth
                    error={errors.usernameError ? true : false}
                    helperText={errors.usernameError}
                />

                <TextField
                    required
                    label="Password"
                    type="password"
                    placeholder="Enter Password"
                    margin="normal"
                    onChange={onPasswordChange}
                    onBlur={passwordBlur}
                    fullWidth
                    error={errors.passwordError ? true : false}
                    helperText={errors.passwordError}
                />

                <TextField
                    required
                    label="Password"
                    type="password"
                    placeholder="ReEnter Password"
                    margin="normal"
                    onBlur={rePasswordBlur}
                    fullWidth
                    error={errors.rePasswordError ? true : false}
                    helperText={errors.rePasswordError}
                />

                <div className={styles.button}>
                    <Button
                        type="submit"
                        variant="contained"
                        className={styles.gradient__Effect}
                        onClick={submitHandler}
                        color="primary"
                        fullWidth>
                        Sign up</Button>
                </div>

                <Typography>
                    Already have an account?
                    <Link onClick={() => {
                        navigate("/login")
                    }}>
                        Login
                    </Link>
                </Typography>
            </Paper>

            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} >
                <Alert onClose={handleClose} severity="error" >
                    {errors.slideBarError}
                </Alert>
            </Snackbar>

        </Grid >
    )
}

export default SignUp