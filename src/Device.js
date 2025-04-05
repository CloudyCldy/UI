import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from "@mui/material";
import AddDeviceButton from "./AddDeviceButton";
import axios from "axios";

const Device = () => {
    const [devices, setDevices] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [formData, setFormData] = useState({
        device_name: "",
        location: "",
        user_id: "",
    });
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchDevices();
    }, []);

    const fetchDevices = async () => {
        try {
            const response = await axios.get("http://3.80.117.46:3000/devices");
            setDevices(response.data);
        } catch (error) {
            console.error("Error fetching devices:", error);
            alert("Failed to retrieve devices. Please check your connection and try again.");
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://3.80.117.46:3000/devices/${id}`);
            fetchDevices();
        } catch (error) {
            console.error("Error deleting device:", error);
            alert("Failed to delete the device. Please check your connection and try again.");
        }
    };

    const handleEdit = (device) => {
        setSelectedDevice(device);
        setFormData({
            device_name: device.device_name,
            location: device.location,
            user_id: device.user_id,
        });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedDevice(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            await axios.put(`http://3.80.117.46:3000/devices/${selectedDevice.id}`, formData);
            fetchDevices();
            setOpen(false);
        } catch (error) {
            console.error("Error updating device:", error);
            alert("Failed to update the device. Please check your connection and try again.");
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const filteredDevices = devices.filter(
        (device) =>
            device.device_name.toLowerCase().includes(searchTerm) ||
            device.location.toLowerCase().includes(searchTerm)
    );

    return (
        <>
            <AddDeviceButton fetchDevices={fetchDevices} />
            
            {/* Filtro de búsqueda */}
            <TextField
                label="Search by Name or Location"
                value={searchTerm}
                onChange={handleSearchChange}
                fullWidth
                margin="normal"
            />

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>User ID</TableCell>
                            <TableCell>Device Name</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredDevices.map((device) => (
                            <TableRow key={device.id}>
                                <TableCell>{device.id}</TableCell>
                                <TableCell>{device.user_id}</TableCell>
                                <TableCell>{device.device_name}</TableCell>
                                <TableCell>{device.location}</TableCell>
                                <TableCell>{device.created_at}</TableCell>
                                <TableCell>
                                    <Button color="primary" onClick={() => handleEdit(device)}>Edit</Button>
                                    <Button color="secondary" onClick={() => handleDelete(device.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default Device;
