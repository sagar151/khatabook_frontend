// material-ui
import { styled, useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

// project imports
import MainCard from "./MainCard";

// assets
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.light,
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(54deg, #90caf9 -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
        borderRadius: '50%',
        top: -30,
        right: -180
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(54deg, #90caf9 -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
        borderRadius: '50%',
        top: -160,
        right: -130
    }
}));

// ==============================|| DASHBOARD - TOTAL INCOME DARK CARD ||============================== //

const TotalIncomeDarkCard = ({debtState}) => {
  const theme = useTheme();

  return (
    <>
      <CardWrapper border={false} content={false}>
        <Box sx={{ p: 2 }}>
          <List sx={{ py: 0 }}>
            <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
              <ListItemAvatar>
                <Avatar
                  variant="rounded"
                  sx={{
                    ...theme.typography.commonAvatar,
                    ...theme.typography.largeAvatar,
                    backgroundColor: theme.palette.primary[800],
                    color: "#fff",
                  }}
                >
                  <PeopleAltIcon fontSize="inherit" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                sx={{
                  py: 0,
                  mt: 0.45,
                  mb: 0.45,
                }}
                primary={
                  <Typography variant="h4" sx={{ color: "#fff" }}>
                    {debtState.paid}
                  </Typography>
                }
                secondary={
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "white", mt: 0.25 }}
                  >
                    Paid
                  </Typography>
                }
              />
              <ListItemText
                sx={{
                  py: 0,
                  mt: 0.45,
                  mb: 0.45,
                }}
                primary={
                  <Typography variant="h4" sx={{ color: "#fff" }}>
                 {debtState.notPaid}
                  </Typography>
                }
                secondary={
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "white", mt: 0.25 }}
                  >
                   Unpaid
                  </Typography>
                }
              />
            </ListItem>
            <Typography color={"white"} variant="h5" sx={{ textAlign: "center" }}>
              Debtors
            </Typography>
          </List>
        </Box>
      </CardWrapper>
    </>
  );
};

export default TotalIncomeDarkCard;
