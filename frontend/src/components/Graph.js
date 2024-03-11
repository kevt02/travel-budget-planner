import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import { useAuth } from './AuthContext';

function Graph() {
    const [dataPoints, setDataPoints] = useState([]);
    const [startCity, setStartCity] = useState('');
    const [endCity, setEndCity] = useState('');
    const [date, setDate] = useState('');
    const [startCityID, setStartCityID] = useState('');
    const [endCityID, setEndCityID] = useState('');
    const [graphRendered, setGraphRendered] = useState(false);

    const { uid } = useAuth();

    const chartRef = useRef(null);

    const fetchUserData = async () => {
        try {
            const response = await fetch(`http://localhost:2000/${uid}/goals`);
            const responseData = await response.json();
    
            setStartCity(responseData[0].StartCity);
            setEndCity(responseData[0].EndCity);
    
            // Convert the date to yyyy-mm-dd format
            const rawDate = new Date(responseData[0].DepartDate);
            const formattedDate = rawDate.toISOString().split('T')[0];
            setDate(formattedDate);
    
            // Call fetchID for both startCity and endCity
            fetchID(startCity, setStartCityID);
            fetchID(endCity, setEndCityID);
            console.log("FetchUserData Called");
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    

    const fetchID = async (city, setCityID) => {
        const options = {
            method: 'GET',
            url: 'https://sky-scanner3.p.rapidapi.com/flights/auto-complete',
            params: { query: city },
            headers: {
                'X-RapidAPI-Key': '083283420emsh49c4a43885e33f2p1d7a5ajsna1d55e10f2ad',
                'X-RapidAPI-Host': 'sky-scanner3.p.rapidapi.com',
            },
        };

        try {
            const response = await axios.request(options);
            const cityID = response.data.data[0]?.presentation?.id;
            setCityID(cityID);
            console.log("FetchID Called");
        } catch (error) {
            console.error('Error with API', error);
        }
    };

    const fetchFlights = async (from, to, date) => {
        const options = {
            method: 'GET',
            url: 'https://sky-scanner3.p.rapidapi.com/flights/price-calendar',
            params: {
                fromEntityId: from,
                departDate: date,
                toEntityId: to
            },
            headers: {
                'X-RapidAPI-Key': '083283420emsh49c4a43885e33f2p1d7a5ajsna1d55e10f2ad',
                'X-RapidAPI-Host': 'sky-scanner3.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);

            const flightData = response.data.data.flights;
            const days = flightData.days || [];

            // Change original date from json to months and set graph
            const newDataPoints = days.map(day => ({
                label: new Date(day.day).toLocaleString('default', { month: 'short' }),
                value: day.price
            }));
            setDataPoints(newDataPoints);
            console.log("FetchFlights Called");
            setGraphRendered(true);

            console.log(response.data);
        } catch (error) {
            console.error('Error with trend API', error);
        }
    };


   // Monitor changes in startCityID and endCityID to call fetchFlights
    useEffect(() => {
        if (startCityID && endCityID) {
            console.log("Calling FetchFlights");
            fetchFlights(startCityID, endCityID, date);
        }
    }, [startCityID, endCityID]);

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
            {graphRendered ? null : (
                <button className="price-button" onClick={fetchUserData}>
                    Check Prices
                </button>
            )}
            <h2>Price Trends from {startCity} to {endCity}</h2>
            <canvas ref={chartRef}></canvas>
        </div>
    );
}

export default Graph;
