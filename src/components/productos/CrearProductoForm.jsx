import { useState, useCallback } from 'react';
import { TextField, Button, Box, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { FileDrop } from 'react-file-drop';

function CrearProductoForm({
    errores, 
    callback,
    pNombreProducto = "", 
    pPrecio = "", 
    pDescripcion = "", 
    pUrlImagen = "", 
    editable, imagenPrevia
}) {
    const [nombreProducto, setNombreProducto] = useState(pNombreProducto);
    const [precio, setPrecio] = useState(pPrecio);
    const [descripcion, setDescripcion] = useState(pDescripcion);
    const [imagen, setImagen] = useState(pUrlImagen);

    const enviarFormulario = (event) => {
        event.preventDefault();
        (!editable) ? callback({nombreProducto, precio, descripcion, imagen}) : callback({nombreProducto, precio, descripcion});
    }

    const onDrop = useCallback((files) => {
        const file = files[0];
        if (file) {
            const validMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!validMimeTypes.includes(file.type)) {
                alert("Tipo de archivo no válido. Por favor, sube una imagen (jpeg, png, gif).");
                return;
            }
            setImagen(file);
            imagenPrevia(URL.createObjectURL(file));
        }
    }, [imagenPrevia]);

    return (
        <Box component="form" onSubmit={enviarFormulario} encType="multipart/form-data">
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} mb={3}>
                    <TextField 
                        variant="standard" 
                        type="text" 
                        label="Nombre" 
                        value={nombreProducto}
                        onChange={(e) => setNombreProducto(e.target.value)}
                        error={!!errores.nombreProducto}
                        helperText={errores.nombreProducto}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12} md={6} mb={3}>
                    <TextField 
                        variant="standard" 
                        type="number" 
                        label="Precio" 
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)} 
                        error={!!errores.precio}
                        helperText={errores.precio}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12} md={12} mb={5}>
                    <TextField 
                        variant="standard" 
                        type="text" 
                        label="Descripción" 
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)} 
                        error={!!errores.descripcion}
                        helperText={errores.descripcion}
                        fullWidth
                        required
                        multiline
                    />
                </Grid>
                {!editable && (
                    <Grid item xs={12} md={12} mb={5}>
                        <FileDrop 
                            onDrop={onDrop} 
                            onTargetClick={() => document.getElementById('fileInput').click()}
                        >
                            <input 
                                id="fileInput"
                                type="file"
                                style={{ display: 'none' }} 
                                onChange={(e) => onDrop(e.target.files)} 
                                accept="image/jpeg, image/png, image/gif" 
                            />
                            <Box 
                                sx={{ 
                                    border: '2px dashed gray', 
                                    padding: '20px', 
                                    textAlign: 'center', 
                                    cursor: 'pointer'
                                }}
                            >
                                <Typography>
                                    Arrastra y suelta una imagen aquí, o haz clic para seleccionar una
                                </Typography>
                            </Box>
                        </FileDrop>
                        {errores.imagen && (
                            <Typography color="error" variant="body2">
                                {errores.imagen}
                            </Typography>
                        )}
                    </Grid>
                )}
            </Grid>
            <Box display='flex' justifyContent='center' mb={5}>
                <Button type="submit" variant="contained" color="error">
                    {editable ? "Actualizar producto" : "Crear producto"}
                </Button>
            </Box>
        </Box>
    );
}

CrearProductoForm.propTypes = {
    errores: PropTypes.shape({
        nombreProducto: PropTypes.string,
        precio: PropTypes.string,
        descripcion: PropTypes.string,
        imagen: PropTypes.string,
    }).isRequired,
    callback: PropTypes.func.isRequired,
    pNombreProducto: PropTypes.string,
    pPrecio: PropTypes.string,
    pDescripcion: PropTypes.string,
    pUrlImagen: PropTypes.string,
    editable: PropTypes.bool,
    imagenPrevia: PropTypes.func
};

export { CrearProductoForm }