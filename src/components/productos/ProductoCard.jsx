import React, { useState } from 'react';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, Typography, IconButton, Box, Menu, MenuItem, Fade } from '@mui/material';
import { Favorite, Share, MoreVert, Edit } from '@mui/icons-material';
import PropTypes from 'prop-types';
import moment from 'moment';
import axios from 'axios';
import { API_URL, DETALLE_PRODUCTO_GET_ENDPOINT } from '../../connections/helpers/endpoints';
import { ModalExtendido } from '../modal/ModalExtendido';
import { ProductoDetalle } from './ProductoDetalle';
import { NavLink } from 'react-router-dom';
import { EliminarProductoMenuItem } from './EliminarProducto';

function ProductoCard({ productoEntity, mostrar }) {
    moment.locale('es');
    const [hover, setHover] = useState(false);
    const [favoritos, setFavorito] = useState([]);
    const [modalOpen, setModalAbierto] = useState(false);
    const [detalleProducto, setDetalleProducto] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const imageUrl = `${API_URL}${productoEntity.urlImagen}`;
    const formattedDate = moment(productoEntity.fecha).format('MMMM DD, YYYY');
    const iniciales = productoEntity.nombreUsuario.slice(0, 2).toUpperCase();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const getColorAleatorio = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    const agregarFavorito = () => {
        setFavorito(favoritos => favoritos.includes(productoEntity.idProducto) ?
            favoritos.filter(id => id !== productoEntity.idProducto) :
            [...favoritos, productoEntity.idProducto]);
    }

    const abrirModal = async () => {
        try {
            const response = await axios.get(`${DETALLE_PRODUCTO_GET_ENDPOINT}/${productoEntity.idProducto}`);
            setDetalleProducto(response.data);
            setModalAbierto(true);
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    const cerrarModal = () => {
        setModalAbierto(false);
    }

    const avatarColor = getColorAleatorio();
    const esFavorito = favoritos.includes(productoEntity.idProducto);

    return (
        <React.Fragment>
            <Card sx={{ boxShadow: '0 0 10px #b2b2b2', height: '100%', maxWidth: { xs: '100%', sm: '100%', md:'100%', lg: '100%' }, minWidth: { xs: '100%', sm: '100%', md:'95%', lg: '95%' } }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: avatarColor }} aria-label="recipe">
                            {iniciales}
                        </Avatar>
                    }
                    action={
                        mostrar ? (
                            <>
                                <IconButton aria-label="settings" onClick={handleClick}>
                                    <MoreVert />
                                </IconButton>
                                <Menu
                                    id="fade-menu"
                                    MenuListProps={{
                                        'aria-labelledby': 'fade-button',
                                    }}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    TransitionComponent={Fade}
                                >
                                    <MenuItem component={NavLink} to={`/producto/editar/${productoEntity.idProducto}`} sx={{ color: 'blue' }}><Edit sx={{ color: 'blue' }} /> Editar</MenuItem>
                                    <EliminarProductoMenuItem id={productoEntity.idProducto} nombreProducto={productoEntity.nombreProducto}/>
                                </Menu>
                            </>
                        ) : null
                    }
                    title={productoEntity.nombreUsuario}
                    subheader={
                        <Typography variant="subtitle2" sx={{ color: '#a0a0a0' }}>
                            {formattedDate}
                        </Typography>
                    }
                />
                <Box
                    sx={{ position: 'relative' }}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    onClick={abrirModal}
                >
                    <CardMedia
                        component="img"
                        height="265"
                        image={imageUrl}
                        alt={productoEntity.nombreProducto}
                        sx={{ width: '100%', objectFit: 'cover', objectPosition: 'center' }}
                    />
                    {hover && (
                        <Box
                            sx={{
                                position: 'absolute',
                                cursor: 'pointer',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                bgcolor: 'rgba(233, 233, 233, 0.5)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: '0.3s ease-in-out'
                            }}
                        >
                            <Typography variant="h5" className='fw-bold'>{productoEntity.nombreProducto}</Typography>
                        </Box>
                    )}
                </Box>
                <CardContent>
                    <Typography variant="h5" className='fw-semibold'>
                        ${productoEntity.precio}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton
                        aria-label="add to favorites"
                        onClick={agregarFavorito}
                    >
                        <Favorite sx={{ color: esFavorito ? 'red' : 'gray'}}
                        />
                    </IconButton>
                    <IconButton aria-label="share">
                        <Share />
                    </IconButton>
                </CardActions>
            </Card>
            {detalleProducto && (
                <ModalExtendido
                    abrir={modalOpen}
                    cerrar={cerrarModal}
                    contenido={<ProductoDetalle productoEntity={productoEntity} />}
                />
            )}
        </React.Fragment>
    )
}

ProductoCard.propTypes = {
    mostrar: PropTypes.bool.isRequired,
    productoEntity: PropTypes.shape({
        precio: PropTypes.string,
        urlImagen: PropTypes.string,
        nombreProducto: PropTypes.string,
        nombreUsuario: PropTypes.string,
        fecha: PropTypes.string,
        descripcion: PropTypes.string,
        idProducto: PropTypes.string
    }).isRequired
}

export { ProductoCard }