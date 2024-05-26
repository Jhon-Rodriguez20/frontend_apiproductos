import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import PropTypes from 'prop-types';

function IniciarSesionFormulario({ errores, callback }) {
    const [celular, setCelular] = useState("");
    const [password, setPassword] = useState("");

    const enviarFormulario = (event) => {
        event.preventDefault();
        callback({ celular, password });
    }

    return (
        <Box component='form' onSubmit={enviarFormulario}>
            <TextField
                fullWidth
                className="mb-4"
                variant="standard"
                type="number"                
                label="Usuario"
                value={celular}
                onChange={(e) => setCelular(e.target.value)}
                error={!!errores.celular}
                helperText={errores.celular}
                required
            />
            <TextField
                fullWidth
                className="mb-5"
                variant="standard"
                type="password"
                label="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!errores.password}
                helperText={errores.password}
                required              
            />
            <Box display='flex' justifyContent='center'>
                <Button type="submit" variant="contained" color="error">Iniciar sesión</Button>
            </Box>
        </Box>
    )
}

IniciarSesionFormulario.propTypes = {
    errores: PropTypes.shape({
        celular: PropTypes.string,
        password: PropTypes.string,
    }).isRequired,
    callback: PropTypes.func.isRequired,
};

export { IniciarSesionFormulario }