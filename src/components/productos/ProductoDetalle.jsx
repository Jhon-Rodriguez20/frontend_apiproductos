import { Box, Typography, CardMedia, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { API_URL } from '../../connections/helpers/endpoints';

function ProductoDetalle({ productoEntity }) {
    const imageUrl = `${API_URL}${productoEntity.urlImagen}`;

    return (
        <Box sx={{ padding: 1, maxHeight: 'calc(90vh - 40px)', overflowY: 'auto' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={6}>
                    <CardMedia
                        component="img"
                        image={imageUrl}
                        alt={productoEntity.nombreProducto}
                        sx={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <Box className='ms-auto me-auto'>
                        <Typography variant="h5" className='fw-bold'>{productoEntity.nombreProducto}</Typography>
                        <Typography variant="h6" className='fw-semibold'>${productoEntity.precio}</Typography>
                    </Box>
                    <Typography variant="body1" className='mt-4' sx={{ wordWrap: 'break-word' }}>
                        {productoEntity.descripcion}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
}

ProductoDetalle.propTypes = {
    productoEntity: PropTypes.shape({
        precio: PropTypes.string.isRequired,
        urlImagen: PropTypes.string.isRequired,
        nombreProducto: PropTypes.string.isRequired,
        descripcion: PropTypes.string.isRequired
    }).isRequired
}

export { ProductoDetalle }