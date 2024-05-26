import { useSnackbar } from 'notistack';
import { Box } from '@mui/material';

const useAlertas = () => {
    const { enqueueSnackbar } = useSnackbar();

    const mostrarAlertaExito = (mensaje) => {
        enqueueSnackbar(
            <Box>
                {mensaje}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        height: '2.5px',
                        width: '100%',
                        backgroundColor: 'white',
                        animation: 'progress 5s linear',
                    }}
                />
            </Box>,
            {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                },
            }
        );
    };

    const mostrarAlertaError = (mensaje) => {
        enqueueSnackbar(
            <Box>
                {mensaje}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        height: '2.5px',
                        width: '100%',
                        backgroundColor: 'white',
                        animation: 'progress 5s linear',
                    }}
                />
            </Box>,
            {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                },
            }
        );
    };

    return { mostrarAlertaExito, mostrarAlertaError };
};

export default useAlertas;