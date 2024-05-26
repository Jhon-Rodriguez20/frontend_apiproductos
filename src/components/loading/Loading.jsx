import { Grid, Skeleton, Box } from '@mui/material';
import PropTypes from 'prop-types';

const Loading = ({ count }) => {
    const renderSkeletons = (count) => {
        return Array.from({ length: count }).map((_, index) => (
            <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton variant="text" width={100} sx={{ ml: 2 }} />
                </Box>
                <Skeleton variant="rectangular" height={200} />
                <Skeleton variant="text" width="80%" sx={{ mt: 1 }} />
            </Grid>
        ));
    };

    return (
        <Grid container spacing={4} paddingBottom={2}>
            {renderSkeletons(count)}
        </Grid>
    )
}

Loading.propTypes = {
    count: PropTypes.number.isRequired
}

export {Loading}