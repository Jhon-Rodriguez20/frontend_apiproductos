import { ProductoCard } from "../../components/productos/ProductoCard";
import { Container, Grid, Typography, Box } from "@mui/material";
import { SentimentVeryDissatisfied } from "@mui/icons-material";
import axios from "axios";
import { PRODUCTOS_GET_ENDPOINT } from '../../connections/helpers/endpoints';
import { useState, useEffect } from "react";
import { TecnologíasUtilizadas } from "../../components/static/TecnologíasUtilizadas";
import { Loading } from "../../components/loading/Loading";

function ProductosPage() {
    const [productoEntity, setProductos] = useState([]);
    const [buscando, setBuscando] = useState(true);

    useEffect(() => {
        axios.get(PRODUCTOS_GET_ENDPOINT)
            .then(respuesta => {
                setProductos(respuesta.data.productoEntity);
                setBuscando(false);
            }).catch(err => {
                console.error("Error al traer los productos", err);
                setBuscando(false);
            });
    }, []);

    return (
        <Container>
            {buscando ? (
                <Loading count={6} />
            ) : (
                productoEntity.length === 0 ? (
                    <Box textAlign="center" mt={4}>
                        <SentimentVeryDissatisfied sx={{ fontSize: 60 }} color="action" />
                        <Typography variant="h6" mt={2}>No se encontraron productos</Typography>
                    </Box>
                ) : (
                    <Grid container spacing={4} paddingBottom={2} mb={5}>
                        {productoEntity.map(producto => (
                            <Grid item xs={12} sm={6} md={6} lg={4} key={producto.idProducto}>
                                <ProductoCard productoEntity={producto} mostrar={false} />
                            </Grid>
                        ))}
                    </Grid>
                )
            )}
            <Typography variant="h5" mt={5} mb={3} textAlign={"center"}>Tecnologías utilizadas</Typography>
            <TecnologíasUtilizadas />
        </Container>
    );
}

export { ProductosPage }