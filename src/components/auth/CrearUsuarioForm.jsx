import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import PropTypes from 'prop-types';

function CrearUsuarioFormulario({ errores, callback }) {
    const [nombre, setNombre] = useState("");
    const [celular, setCelular] = useState("");
    const [password, setPassword] = useState("");
    const [confirmarPassword, setConfirmarPassword] = useState("");
    const [confirmarPasswordError, setConfirmarPasswordError] = useState("");

    const enviarFormulario = (event) => {
        event.preventDefault();
        setConfirmarPasswordError("");

        if (password !== confirmarPassword) {
            setConfirmarPasswordError("Las contraseñas no coinciden");
            return;
        }

        callback({ nombre, celular, password });
    }

    return (
        <Box component='form' onSubmit={enviarFormulario}>
            <TextField
                fullWidth
                className="mb-4"
                variant="standard"
                type="text"
                label="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                error={!!errores.nombre}
                helperText={errores.nombre}
                required
            />
            <TextField
                fullWidth
                className="mb-4"
                variant="standard"
                type="number"
                label="Celular"
                value={celular}
                onChange={(e) => setCelular(e.target.value)}
                error={!!errores.celular}
                helperText={errores.celular}
                required
            />
            <TextField
                fullWidth
                className="mb-4"
                variant="standard"
                type="password"
                label="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!errores.password}
                helperText={errores.password}
                required              
            />
            <TextField
                fullWidth
                className="mb-5"
                variant="standard"
                type="password"
                label="Confirmar contraseña"
                value={confirmarPassword}
                onChange={(e) => setConfirmarPassword(e.target.value)}
                error={!!confirmarPasswordError}
                helperText={confirmarPasswordError}
                required              
            />
            <Box display='flex' justifyContent='center'>
                <Button type="submit" variant="contained" color="error">Registrarse</Button>
            </Box>
        </Box>
    )
}

CrearUsuarioFormulario.propTypes = {
    errores: PropTypes.shape({
        nombre: PropTypes.string,
        celular: PropTypes.string,
        password: PropTypes.string,
    }).isRequired,
    callback: PropTypes.func.isRequired,
};

export { CrearUsuarioFormulario }