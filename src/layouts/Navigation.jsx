import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Typography, Box, Button
} from '@mui/material';
import {
    Person, Settings, Logout, Close, Menu, Home, ExpandMore, Inventory, Assignment
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { cerrarSesion } from '../connections/usuarioAcciones';

const Navigation = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const conectado = useSelector((estado) => estado.conectado);
    const usuario = useSelector((estado) => estado.usuario);
    const dispatch = useDispatch();

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    const toggleUserMenu = (event) => {
        event.stopPropagation();
        setUserMenuOpen(!userMenuOpen);
    };

    const handleLogout = () => {
        dispatch(cerrarSesion());
    };

    const contenidoNavbar = (
        <Box
            sx={{
                width: { xs: 250, sm: 280, md: 320 },
                display: 'flex',
                flexDirection: 'column',
            }}
            role="presentation"
        >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
                <Typography variant="h6">Menú</Typography>
                <IconButton onClick={toggleDrawer(false)}>
                    <Close />
                </IconButton>
            </Box>
            <List>
                <ListItem button key="Home" component={NavLink} to='/' onClick={toggleDrawer(false)}>
                    <Home sx={{ marginRight: 1 }} />
                    <ListItemText primary="Home" />
                </ListItem>
                {conectado && (
                    <>
                        <ListItem button key="Crear producto" component={NavLink} to='/producto/crear' onClick={toggleDrawer(false)}>
                            <Inventory sx={{ marginRight: 1 }} />
                            <ListItemText primary="Crear producto" />
                        </ListItem>
                        <ListItem button key={usuario.name} onClick={toggleUserMenu}>
                            <Person sx={{ marginRight: 1 }} />
                            <ListItemText primary={usuario.name} />
                            <ExpandMore sx={{ transform: userMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }} />
                        </ListItem>
                        {userMenuOpen && (
                            <>
                                <ListItem button key="Mis productos" component={NavLink} to='/usuario/leerMisProductos' sx={{ marginLeft: 3 }} onClick={toggleDrawer(false)}>
                                    <Assignment sx={{ marginRight: 1 }} />
                                    <ListItemText primary="Mis productos" />
                                </ListItem>
                                <ListItem button key="Configuracion" component={NavLink} to='/' sx={{ marginLeft: 3 }} onClick={toggleDrawer(false)}>
                                    <Settings sx={{ marginRight: 1 }} />
                                    <ListItemText primary="Configuracion" />
                                </ListItem>
                                <ListItem button key='cerrar sesión' onClick={() => { handleLogout(); toggleDrawer(false)(); }} sx={{ marginLeft: 3 }}>
                                    <Logout sx={{ marginRight: 1 }} />
                                    <ListItemText primary='Cerrar sesión' />
                                </ListItem>
                            </>
                        )}
                    </>
                )}
            </List>
        </Box>
    );

    return (
        <Box sx={{ flexGrow: 1 }} mb={5}>
            <AppBar position="static" sx={{ backgroundColor: 'rgb(232, 5, 5)' }}>
                <Toolbar>
                    <Box sx={{ flexGrow: 1 }}>
                        <Button color="inherit" component={NavLink} to="/">
                            Productos
                        </Button>
                    </Box>
                    <Box>
                        {!conectado ? (
                            <Button color="inherit" component={NavLink} to="/usuario/loguearse">
                                Iniciar sesión
                            </Button>
                        ) : null}
                        <IconButton
                            edge="end"
                            color="inherit"
                            aria-label="menu"
                            onClick={toggleDrawer(true)}
                            sx={{ ml: 2 }}
                        >
                            <Menu />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
            >
                {contenidoNavbar}
            </Drawer>
        </Box>
    );
};

export { Navigation }