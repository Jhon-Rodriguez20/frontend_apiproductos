import { useEffect, useState } from "react";
import { Box, Container, Typography, Grid } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { IniciarSesionFormulario } from "../../components/auth/IniciarSesionForm";
import { autenticacion } from '../../connections/usuarioAcciones';
import fondoLogin from '../../assets/img/fondo_login.jpg';
import useAlertas from '../../components/alertas/Alertas';
import { BackDropProgreso } from '../../components/common/BackDropProgreso';

function IniciarSesion() {
    const [errores, setErrores] = useState({});
    const [loading, setLoading] = useState(false);
    const conectado = useSelector(estado => estado.conectado);
    const navegar = useNavigate();
    const enviarAccion = useDispatch();
    const { mostrarAlertaError } = useAlertas();

    useEffect(() => {
        if (conectado) {
            navegar("/");
        }
    }, [conectado, navegar]);

    const login = ({ celular, password }) => {
        const error = {};
        setErrores(error);
        setLoading(true);

        enviarAccion(autenticacion({ celular, password }))
            .then(() => {
                setLoading(false);
                navegar("/");
            })
            .catch(() => {
                setLoading(false);
                mostrarAlertaError("Credenciales incorrectas.");
            });
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
                    border: '1px solid #ccc', borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', bgcolor: 'white'
                }}>
                    <Grid item xs={12} md={6}>
                        <Box
                            component="img"
                            src={fondoLogin}
                            alt="Fondo de inicio de sesión"
                            sx={{ width: '100%', height: '100%' }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box p={3}>
                            <Typography variant="h4" fontWeight={"bold"} align="center" gutterBottom>
                                Iniciar Sesión
                            </Typography>
                            <Typography variant="subtitle1" mb={4} align="center">
                                Por favor, ingresa tus credenciales para continuar
                            </Typography>
                            <IniciarSesionFormulario errores={errores} callback={login} />
                            <Box mt={3}>
                                <Typography variant="body1" textAlign="center">
                                    ¿No tienes una cuenta? <Link to={'/usuario/registrar'}>Regístrate aquí</Link>
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export { IniciarSesion }