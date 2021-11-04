import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

const TotalProfit = ({ number, title }) => (
  <Card>
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
            {title.toUpperCase()}
          </Typography>
          <Typography
            color="textPrimary"
            variant="h3"
          >
            <NumberFormat value={number} displayType="text" thousandSeparator="," prefix="$" />
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: indigo[600],
              height: 56,
              width: 56
            }}
          >
            <AttachMoneyIcon />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

TotalProfit.propTypes = {
  number: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
};

export default TotalProfit;
