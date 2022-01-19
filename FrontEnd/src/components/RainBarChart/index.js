import { useEffect, useState } from 'react';

import { Backdrop, CircularProgress, Dialog } from '@mui/material';
import styles from './index.module.scss';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


export default function RainBarChart(props) {
    const { data, open, onClose } = props;

    const [flag, setFlag] = useState(false)
    const [minisData, setMinisData] = useState({})

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Rainfall Per Minute For The Next Hour',
            },
        },
    };

    const fetchData = () => {
        if (data.minutely !== 'undefined') {
            setMinisData(
                {
                    labels: data.minutely.map(e => new Date(e.dt * 1000).toLocaleTimeString()),
                    datasets: [{
                        label: 'Minute Precipitation Volume',
                        data: data.minutely.map(e => e.precipitation),
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        borderWidth: 1
                    }]
                }
            )
            setFlag(true)
        }

    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleClose = () => {
        onClose()
    }



    return (
        <Dialog open={open} onClose={handleClose} className={styles.container}>
            <div >
                <div className={styles.barChart}>
                    {flag ? <Bar options={options} data={minisData} /> : ""}
                </div>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={!flag}>
                    <CircularProgress color="inherit" />
                </Backdrop>

            </div>
        </Dialog>

    )
}