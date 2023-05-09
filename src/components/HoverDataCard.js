// material-ui
import { Grid,  Stack, Typography } from '@mui/material';
import MainCard from './MainCard';

// project imports

// ============================|| HOVER DATA CARD ||============================ //


const HoverDataCard = ({ title, iconPrimary, primary, secondary,third, color }) => {
    const IconPrimary = iconPrimary;
    const primaryIcon = iconPrimary !== undefined ? <IconPrimary fontSize="large" sx={{ width: 20, height: 20, color }} /> : null;

    return (
        <MainCard>
            <Grid container justifyContent="space-between" direction="column" alignItems="center" >
                <Grid item sm={12}>
                    <Typography variant="h5" color="inherit">
                        {title}
                    </Typography>
                </Grid>
                <Grid item sm={12}>
                    <Stack direction="row" alignItems="center" spacing={0.5} sx={{ my: 1.75, mx: 'auto' }}>
                        {primaryIcon}
                        <Typography variant="h3" color={"hsl(0 0 90%)"}>{primary}</Typography>
                    </Stack>
                </Grid>
                <Grid item sm={12}>
                    <Typography variant="body2" color="primary">
                        {secondary}
                    </Typography>
                    <Typography variant="body2" color="primary">
                        {third}
                    </Typography>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default HoverDataCard;