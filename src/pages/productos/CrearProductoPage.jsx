import { useState } from "react";
import { Container, Box, Alert, Typography, Grid } from "@mui/material";
import { ImageNotSupported } from "@mui/icons-material";
import axios from "axios";
import { CREARPRODUCTO_POST_ENDPOINT } from '../../connections/helpers/endpoints';
import { CrearProductoForm } from "../../components/productos/CrearProductoForm";
import { useNavigate } from "react-router-dom";
import useAlertas from '../../components/alertas/Alertas';
import { BackDropProgreso } from '../../components/common/BackDropProgreso';

function CrearProducto() {

    const [errores, setErrores] = useState({});
    const [loading, setLoading] = useState(false);
    const [imagenPrevia, setImagenPrevia] = useState('');
    const navegar = useNavigate();
    const { mostrarAlertaExito, mostrarAlertaError } = useAlertas();

    const crearProducto = async ({nombreProducto, precio, descripcion, imagen})=> {
        const errores = {};
        setErrores(errores);
        setLoading(true);

        axios.post(CREARPRODUCTO_POST_ENDPOINT, {nombreProducto, precio, descripcion, imagen},
            {headers: {'Content-Type': 'multipart/form-data'}}
        ).then(()=> {
            setLoading(false);
            mostrarAlertaExito("¡Producto creado con éxito!");
            navegar("/");
        }).catch(()=> {
            setLoading(false);
            const mensajeError = errores.response?.data?.error || "Ocurrió un error al crear el producto.";
            mostrarAlertaError(mensajeError);
        })
    }

    return (
        <Container className="d-flex justify-content-center mt-4">
            <BackDropProgreso open={loading} />
            <Box display="flex" justifyContent="center" alignItems="center" sx={{minHeight: '65vh'}}>
                <Grid container alignItems='center' padding={2} sx={{border: '1px solid #ccc', borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'}}>
                    <Grid item xs={12} md={6}>
                        <Box>
                            <Typography variant="h5" textAlign="center" fontWeight={"bold"} mt={4} mb={4}>Crear producto</Typography>
                            {errores.new && <Alert variant="danger">{errores.new}</Alert>}
                            <CrearProductoForm errores={errores} callback={crearProducto} editable={false} imagenPrevia={setImagenPrevia}/>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box
                            display="flex"
                            padding={2}
                            justifyContent="center"
                            alignItems="center"
                            sx={{ width: '100%', height: '450px', marginBottom: '2%', overflow: 'hidden' }}
                        >
                            {imagenPrevia ? (
                                <Box
                                    component="img"
                                    src={imagenPrevia}
                                    alt="Previsualización de la imagen"
                                    sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                />
                            ) : (
                                <ImageNotSupported sx={{ fontSize: 150, color: '#ccc' }} />
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export {CrearProducto}