import { Modal, Box, IconButton, Slide } from '@mui/material';
import { Close } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

function ModalExtendido({ abrir, cerrar, contenido }) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (abrir) {
            setShow(true);
        }
    }, [abrir]);

    const handleClose = () => {
        setShow(false);
        setTimeout(cerrar, 300);
    };

    return (
        <Modal
            open={abrir}
            onClose={handleClose}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflowY: 'auto'
            }}
            closeAfterTransition
        >
            <Slide in={show} direction="down" timeout={{ enter: 300, exit: 300 }}>
                <Box
                    sx={{ 
                        width: { xs: '85%', md: '50%', lg: '45%' }, 
                        bgcolor: "#fff", 
                        maxHeight: '90vh', 
                        overflowY: 'auto', 
                        display: 'flex', 
                        flexDirection: 'column',
                        padding: 2 
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <IconButton onClick={handleClose}>
                            <Close sx={{ fontSize: '125%' }} />
                        </IconButton>
                    </Box>
                    <Box sx={{ flex: 1, overflowY: 'auto' }}>
                        {contenido}
                    </Box>
                </Box>
            </Slide>
        </Modal>
    );
}

ModalExtendido.propTypes = {
    abrir: PropTypes.bool.isRequired,
    cerrar: PropTypes.func.isRequired,
    contenido: PropTypes.node.isRequired,
}

export { ModalExtendido }