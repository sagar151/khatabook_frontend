// material-ui
import { useTheme, styled } from "@mui/material/styles";
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
  overflow: "hidden",
  position: "relative",
  "&:after": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${theme.palette.warning.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: "50%",
    top: -30,
    right: -180,
  },
  "&:before": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${theme.palette.warning.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
    borderRadius: "50%",
    top: -160,
    right: -130,
  },
}));

// ==============================|| DASHBOARD - TOTAL INCOME LIGHT CARD ||============================== //

const TotalIncomeLightCard = ({ creditState }) => {
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
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? theme.palette.dark.main
                        : theme.palette.warning.light,
                    color:
                      theme.palette.mode === "dark"
                        ? theme.palette.warning.dark
                        : theme.palette.warning.dark,
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
                  <Typography variant="h4">{creditState.paid}</Typography>
                }
                secondary={
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: theme.palette.grey[500],
                      mt: 0.5,
                    }}
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
                  <Typography variant="h4"> {creditState.notPaid}</Typography>
                }
                secondary={
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: theme.palette.grey[500],
                      mt: 0.5,
                    }}
                  >
                    Unpaid
                  </Typography>
                }
              />
            </ListItem>
            <Typography
              variant="h5"
              sx={{ color: "#9e9e9e", textAlign: "center" }}
            >
              Creditors
            </Typography>
          </List>
        </Box>
      </CardWrapper>
    </>
  );
};

export default TotalIncomeLightCard;
