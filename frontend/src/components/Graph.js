import React, { useEffect, useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

function Graph() {
    const [dataPoints, setDataPoints] = useState([]);

    const chartRef = useRef(null);

    useEffect(() => {
        // Fetch data from your backend API
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:2000/savings/seattle/paris'); // Replace with your API endpoint
                const data = await response.json();

                setDataPoints(data.map(({ price, startdate }) => ({
                    label: new Date(startdate).toLocaleString('default', { month: 'short' }),
                    value: price,
                })));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

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
        <div>
            <h2>Price Trends from</h2>
            <canvas ref={chartRef}></canvas>
        </div>
    );
}

export default Graph;
