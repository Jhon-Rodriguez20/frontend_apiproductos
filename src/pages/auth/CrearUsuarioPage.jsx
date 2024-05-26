import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CrearUsuarioFormulario } from '../../components/auth/CrearUsuarioForm';
import { SIGNUP_POST_ENDPOINT } from '../../connections/helpers/endpoints';
import { Box, Container, Typography, Grid } from '@mui/material';
import fondoLogin from '../../assets/img/fondo_login.jpg';
import useAlertas from "../../components/alertas/Alertas";
import { BackDropProgreso } from "../../components/common/BackDropProgreso";

function CrearUsuario() {

    const [errores, setErrores] = useState({});
    const [loading, setLoading] = useState(false);
    const navegar = useNavigate();
    const { mostrarAlertaExito, mostrarAlertaError } = useAlertas();

    const registro = async ({ nombre, celular, password }) => {
        const error = {};
        setErrores(error);
        setLoading(true);

        try {
            await axios.post(SIGNUP_POST_ENDPOINT, { nombre, celular, password }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            setLoading(false);
            mostrarAlertaExito("Registro completado con éxito!");
            navegar("/usuario/loguearse");
        } catch (error) {
            setLoading(false);
            const mensajeError = error.response?.data?.error || "Ocurrió un error al registrarse.";
            mostrarAlertaError(mensajeError);
        }
    }

    return (
        <Container>
            <BackDropProgreso open={loading} />
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                    minHeight: '80vh'
                }}
            >
                <Grid container alignItems='center' padding={1} sx={{
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', bgcolor: 'white'
                }}>
                    <Grid item xs={12} md={6}>
                        <Box p={3}>
                            <Typography variant="h4" align="center" fontWeight={"bold"} gutterBottom>
                                Registro
                            </Typography>
                            <Typography variant="subtitle1" mb={4} align="center">
                                Por favor, completa todos los formularios para continuar
                            </Typography>
                            <CrearUsuarioFormulario errores={errores} callback={registro} />
                            <Box mt={3}>
                                <Typography variant="body1" textAlign="center">
                                    ¿Ya tienes una cuenta? <Link to={'/usuario/loguearse'}>Iniciar sesión aquí</Link>
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box
                            component="img"
                            src={fondoLogin}
                            alt="Fondo de inicio de sesión"
                            sx={{ width: '100%', height: '100%', marginBottom: '2%' }}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export { CrearUsuario }