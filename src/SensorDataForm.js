import React, { useState } from 'react';

const SensorDataForm = () => {
    const [deviceId, setDeviceId] = useState('');
    const [temperature, setTemperature] = useState('');
    const [humidity, setHumidity] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!deviceId || !temperature || !humidity) {
            setError('Please fill in all fields');
            return;
        }

        setError('');
        setMessage('');

        try {
            const response = await fetch('http://34.224.75.233:3000/sensor-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    device_id: deviceId,
                    temperature: temperature,
                    humidity: humidity,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(`Data saved successfully: ID ${data.id}`);
            } else {
                setError(data.error || 'Error saving data');
            }
        } catch (err) {
            setError('Error connecting to the server');
        }
    };

    return (
        <div>
            <h2>Sensor Data Form</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Device ID:</label>
                    <input
                        type="text"
                        value={deviceId}
                        onChange={(e) => setDeviceId(e.target.value)}
                    />
                </div>
                <div>
                    <label>Temperature (°C):</label>
                    <input
                        type="number"
                        value={temperature}
                        onChange={(e) => setTemperature(e.target.value)}
                    />
                </div>
                <div>
                    <label>Humidity (%):</label>
                    <input
                        type="number"
                        value={humidity}
                        onChange={(e) => setHumidity(e.target.value)}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>

            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default SensorDataForm;
