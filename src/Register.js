import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../src/Register.css"; // Asegúrate de que el archivo CSS esté bien enlazado

export default function Register() {
    const [user, setUser] = useState({ name: "", email: "", password: "", rol: "normal" });
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    // Manejo del cambio en los campos
    const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

    // Función para registrar al usuario
    const handleRegister = async (e) => {
        e.preventDefault();

        // Verifica que la contraseña sea un string antes de enviarla
        if (!user.password || typeof user.password !== "string") {
            setMessage("La contraseña debe ser un texto válido.");
            return;
        }

        try {
            // Enviar la solicitud al backend
            const response = await axios.post("http://34.224.75.233:3000/register", {
                name: user.name,
                email: user.email,
                password: String(user.password),  // Asegura que siempre sea string
                rol: user.rol || "normal"
            });

            setMessage("¡Registro exitoso!");

            // Redirige al login después de 2 segundos
            setTimeout(() => navigate("/login"), 2000);

        } catch (error) {
            // Muestra los mensajes de error del backend
            setMessage(error.response?.data?.error || "Error en el registro.");
        }
    };

    // Función para regresar a la página anterior
    const handleGoBack = () => {
        navigate(-1);  // Redirige a la página anterior
    };

    return (
        <div className="register-wrap">
            <div className="register-html">
                <div className="register-form">
                    <h2 className="h2">Registro</h2>

                    {/* Muestra el mensaje de éxito o error */}
                    {message && <p className="error-message">{message}</p>}

                    {/* Botón de regresar */}
                    <button onClick={handleGoBack} className="bac-button">Regresar</button>

                    <form onSubmit={handleRegister}>
                        {/* Campo para el nombre */}
                        <div className="group">
                            <label htmlFor="name" className="label">Nombre</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="input"
                                value={user.name}
                                onChange={handleChange}
                                placeholder="Nombre"
                                required
                            />
                        </div>

                        {/* Campo para el correo */}
                        <div className="group">
                            <label htmlFor="email" className="label">Correo</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="input"
                                value={user.email}
                                onChange={handleChange}
                                placeholder="Correo"
                                required
                            />
                        </div>

                        {/* Campo para la contraseña */}
                        <div className="group">
                            <label htmlFor="password" className="label">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="input"
                                value={user.password}
                                onChange={handleChange}
                                placeholder="Contraseña"
                                required
                            />
                        </div>

                        {/* Selector para el rol */}
                        <div className="group">
                            <label htmlFor="rol" className="label">Rol</label>
                            <select
                                id="rol"
                                name="rol"
                                className="input"
                                value={user.rol}
                                onChange={handleChange}
                                required
                            >
                                <option value="normal" className="normal">Normal</option>
                                <option value="admin" className="admin">Admin</option>
                            </select>
                        </div>

                        {/* Botón para registrar */}
                        <div className="group">
                            <button type="submit" className="button">Registrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
