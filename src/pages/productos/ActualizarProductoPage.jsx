import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ACTUALIZAR_PRODUCTO_PUT_ENDPOINT, DETALLE_PRODUCTO_GET_ENDPOINT } from "../../connections/helpers/endpoints";
import { CrearProductoForm } from "../../components/productos/CrearProductoForm";
import { Container, Box, Typography, Grid } from "@mui/material";
import useAlertas from "../../components/alertas/Alertas";
import { BackDropProgreso } from "../../components/common/BackDropProgreso";

function EditarProducto() {

    const {id} = useParams();
    const [errores, setErrores] = useState({});
    const [loading, setLoading] = useState(false);
    const [producto, setProducto] = useState(null);
    const navegar = useNavigate();
    const { mostrarAlertaExito, mostrarAlertaError } = useAlertas();

    useEffect(()=> {
        axios.get(`${DETALLE_PRODUCTO_GET_ENDPOINT}/${id}`
        ).then(respuesta=> {
            setProducto(respuesta.data.productoEntity);
        }).catch((err)=> {
            console.error(err);
        })
    }, [id, navegar]);

    const editarProducto = async ({nombreProducto, precio, descripcion})=> {
        const error={};
        setErrores(error);
        setLoading(true);

        axios.put(`${ACTUALIZAR_PRODUCTO_PUT_ENDPOINT}/${producto.idProducto}`, {nombreProducto, precio, descripcion}
        ).then(()=> {
            setLoading(false);
            mostrarAlertaExito("¡Producto editado con éxito!");
            navegar("/");
        }).catch(()=> {
            setLoading(false);
            mostrarAlertaError("Ocurrió un error al editar el producto.");
        })
    }

    return (
        <Container className="d-flex justify-content-center mt-4">
            <BackDropProgreso open={loading} />
            <Box display="flex" justifyContent="center" alignItems="center" sx={{minHeight: '65vh'}}>
                <Grid container alignItems='center' padding={2} sx={{border: '1px solid #ccc', borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'}}>
                    <Grid item xs={12} md={12} lg={12}>
                        <Box>
                            <Typography variant="h5" textAlign="center" fontWeight={"bold"} mt={3} mb={4}>Editar producto</Typography>
                            { producto &&
                                <CrearProductoForm
                                    errores={errores}
                                    callback={editarProducto}
                                    pNombreProducto={producto.nombreProducto}
                                    pPrecio={producto.precio}
                                    pDescripcion={producto.descripcion}
                                    editable={true}
                                />
                            }
                        </Box>
                    </Grid>
                </Grid>
            </Box>            
        </Container>
    )
}

export {EditarProducto}