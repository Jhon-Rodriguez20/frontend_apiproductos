import { Backdrop, CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';

function BackDropProgreso({ open }) {
    return (
        <Backdrop open={open} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}

BackDropProgreso.propTypes = {
    open: PropTypes.bool.isRequired,
}

export { BackDropProgreso }