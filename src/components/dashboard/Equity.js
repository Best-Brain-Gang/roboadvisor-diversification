import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import MoneyIcon from '@material-ui/icons/Money';
import { green, red } from '@material-ui/core/colors';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

const Equity = ({ equity }) => (
  <Card
    sx={{ height: '100%' }}
  >
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="h6"
          >
            TOTAL EQUITY
          </Typography>
          <Typography
            color="textPrimary"
            variant="h3"
          >
            <NumberFormat value={equity} displayType="text" thousandSeparator="," prefix="$" />
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: red[600],
              height: 56,
              width: 56
            }}
          >
            <MoneyIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          pt: 2,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <ArrowUpwardIcon sx={{ color: green[900] }} />
        <Typography
          sx={{
            color: green[900],
            mr: 1
          }}
          variant="body2"
        >
          4%
        </Typography>
        <Typography
          color="textSecondary"
          variant="caption"
        >
          Since last month
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

Equity.propTypes = {
  equity: PropTypes.number.isRequired
};

export default Equity;
