import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

function LineGraph() {
    const [dataPoints, setDataPoints] = useState([]);

    useEffect(() => {
        // Static dataset for demonstration
        const staticData = [
            { label: 'Jan', value: 3 },
            { label: 'Feb', value: 6 },
            { label: 'Mar', value: 9 },
        ];

        setDataPoints(staticData);
    }, []);

    // You can customize the chart options here
    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    // Create the dataset for the chart
    const chartData = {
        labels: dataPoints.map((point) => point.label),
        datasets: [
            {
                label: 'Price',
                data: dataPoints.map((point) => point.value),
                backgroundColor: 'orange',
                borderColor: 'black',
                pointBorderColor: 'orange',
            },
        ],
    };
    

    return (
        <div>
            <h2>Simple Line Chart</h2>
            <Line data={chartData} options={chartOptions} />
        </div>
    );
}

export default LineGraph;
