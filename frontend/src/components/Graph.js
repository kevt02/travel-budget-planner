import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';

function Graph() {
    const [dataPoints, setDataPoints] = useState([]);
    const [startCity, setStartCity] = useState('');
    const [endCity, setEndCity] = useState('');

    const chartRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:2000/2/graph');
                const responseData = await response.json();

                if (Array.isArray(responseData) && responseData.length > 0) {
                    const data = responseData[0];

                    setStartCity(data[0].startcity);
                    setEndCity(data[0].endcity);

                    setDataPoints(data.map(({ price, startdate }) => ({
                        label: new Date(startdate).toLocaleString('default', { month: 'short' }),
                        value: price,
                    })));
                } else {
                    console.error('Invalid data format in the response.');
                }
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
        <div className="graph">
            <h2>Price Trends from {startCity} to {endCity}</h2>
            <canvas ref={chartRef}></canvas>
        </div>
    );
}

export default Graph;
