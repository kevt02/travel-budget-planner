import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

function Graph() {
    const [dataPoints, setDataPoints] = useState([]);
    const [startCity, setStartCity] = useState('');
    const [endCity, setEndCity] = useState('');

    const chartRef = useRef(null);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch('http://localhost:2000/2/graph');
    //             const responseData = await response.json();

    //             if (Array.isArray(responseData) && responseData.length > 0) {
    //                 const data = responseData[0];

    //                 setStartCity(data[0].startcity);
    //                 setEndCity(data[0].endcity);

    //                 setDataPoints(data.map(({ price, startdate }) => ({
    //                     label: new Date(startdate).toLocaleString('default', { month: 'short' }),
    //                     value: price,
    //                 })));
    //             } else {
    //                 console.error('Invalid data format in the response.');
    //             }
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchData();
    // }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:2000/2/graph');
                const responseData = await response.json();

                setStartCity(responseData.startcity)
                setEndCity(responseData.endcity);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const axios = require('axios');

    // Assuming this code is inside an async function or an async context

    // get the start city code from api
    
    const fetchData = async () => {
        const options = {
            method: 'GET',
            url: 'https://sky-scanner3.p.rapidapi.com/flights/auto-complete',
            params: { query: startCity },
            headers: {
                'X-RapidAPI-Key': 'bbc4048502msh091e06da4bef4aep19a2d0jsn50a77f87e955',
                'X-RapidAPI-Host': 'sky-scanner3.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);

            // Rest of your code that uses response.data or chartOptions
        } catch (error) {
            console.error(error);
        };
    };

    // Call the fetchData function
    fetchData();


    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    useEffect(() => {
        if (chartRef.current) {
            const chartCanvas = chartRef.current.getContext('2d');

            if (chartRef.current.chart) {
                chartRef.current.chart.destroy();
            }

            chartRef.current.chart = new Chart(chartCanvas, {
                type: 'line',
                data: {
                    labels: dataPoints.map((point) => point.label),
                    datasets: [
                        {
                            label: 'Price USD',
                            data: dataPoints.map((point) => point.value),
                            backgroundColor: 'orange',
                            borderColor: 'black',
                            pointBorderColor: 'orange',
                        },
                    ],
                },
            });
        }
    }, [dataPoints]);

    return (
        <div className="graph">
            <h2>Price Trends from {startCity} to {endCity}</h2>
            <canvas ref={chartRef}></canvas>
        </div>
    );
}

export default Graph;
