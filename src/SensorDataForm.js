import React, { useState, useEffect } from 'react';

const SensorDataViewer = () => {
    const [sensorData, setSensorData] = useState([]);
    const [error, setError] = useState('');

    // ✅ Obtener datos al cargar el componente
    useEffect(() => {
        fetchSensorData();
    }, []);

    // 🔥 Función para obtener los datos desde la API
    const fetchSensorData = async () => {
        try {
            const response = await fetch('http://18.212.83.4:3000/sensores');
            
            if (!response.ok) {
                throw new Error('Failed to load data');
            }

            const data = await response.json();
            setSensorData(data);

        } catch (err) {
            setError('Error connecting to the server');
        }
    };

    return (
        <div>
            <h2>Stored Sensor Data</h2>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <table border="1" cellPadding="10" cellSpacing="0">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Device ID</th>
                        <th>Temperature (°C)</th>
                        <th>Humidity (%)</th>
                        <th>Recorded At</th>
                    </tr>
                </thead>
                <tbody>
                    {sensorData.length > 0 ? (
                        sensorData.map((data) => (
                            <tr key={data.id}>
                                <td>{data.id}</td>
                                <td>{data.device_id}</td>
                                <td>{data.temperature}°C</td>
                                <td>{data.humidity}%</td>
                                <td>{new Date(data.recorded_at).toLocaleString()}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" style={{ textAlign: 'center' }}>No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default SensorDataForm;
