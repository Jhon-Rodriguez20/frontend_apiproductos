import { useEffect, useState } from "react";
import axios from "axios";
import { ProductoCard } from '../../components/productos/ProductoCard';
import { MISPRODUCTOS_GET_ENDPOINT } from "../../connections/helpers/endpoints";
import { Box, Container, Grid, Typography } from "@mui/material";
import { Loading } from "../../components/loading/Loading";
import { SentimentVeryDissatisfied } from "@mui/icons-material";

function MisProductos() {
    const [productos, setProductos] = useState([]);
    const [buscando, setBuscando] = useState(false);

    useEffect(()=> {
        axios.get(MISPRODUCTOS_GET_ENDPOINT)
        .then(respuesta=> {
            if(Array.isArray(respuesta.data.productoEntity)) {
                setProductos(respuesta.data.productoEntity);
            }
            setBuscando(false);
        }).catch(err=> {
            console.log(err);
            setBuscando(false);
        });
    }, []);

    return (
        <Container>
            {buscando ? (
                <Loading count={6} />
            ) : (
                productos.length === 0 ? (
                    <Box textAlign="center" mt={4}>
                        <SentimentVeryDissatisfied sx={{ fontSize: 60 }} color="action" />
                        <Typography variant="h6" mt={2}>No se encontraron productos</Typography>
                    </Box>
                ) : (
                    <Grid container spacing={4} paddingBottom={2}>
                        {productos.map(producto => (
                            <Grid item xs={12} sm={6} md={6} lg={4} key={producto.idProducto}>
                                <ProductoCard productoEntity={producto} mostrar={true} />
                            </Grid>
                        ))}
                    </Grid>
                )
            )}
        </Container>
    )
}

export {MisProductos}