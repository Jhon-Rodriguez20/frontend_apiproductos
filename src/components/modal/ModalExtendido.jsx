import { Modal, Box, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import PropTypes from 'prop-types';

function ModalExtendido({ abrir, cerrar, contenido }) {
    return (
        <Modal
            open={abrir}
            onClose={cerrar}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflowY: 'auto'
            }}
        >
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
                    <IconButton onClick={cerrar}>
                        <Close sx={{ fontSize: '125%' }} />
                    </IconButton>
                </Box>
                <Box sx={{ flex: 1, overflowY: 'auto' }}>
                    {contenido}
                </Box>
            </Box>
        </Modal>
    );
}

ModalExtendido.propTypes = {
    abrir: PropTypes.bool.isRequired,
    cerrar: PropTypes.func.isRequired,
    contenido: PropTypes.node.isRequired,
}

export { ModalExtendido }