import { Doughnut } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  useTheme
} from '@material-ui/core';
import propTypes from 'prop-types';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import PhoneIcon from '@material-ui/icons/Phone';
import TabletIcon from '@material-ui/icons/Tablet';
import portfolios from '../../__mocks__/portfolios';

const AssetAllocations = (props) => {
  const theme = useTheme();
  const { portfolioType } = props;

  let data = {
    datasets: [
      {
        data: [63, 15, 22],
        backgroundColor: [
          colors.indigo[500],
          colors.red[600],
          colors.orange[600]
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: ['Stocks', 'Bonds', 'Crypto']
  };

  let devices = [
    {
      title: 'Stocks',
      value: 63,
      icon: LaptopMacIcon,
      color: colors.indigo[500]
    },
    {
      title: 'Bonds',
      value: 15,
      icon: TabletIcon,
      color: colors.red[600]
    },
    {
      title: 'Crypto',
      value: 23,
      icon: PhoneIcon,
      color: colors.orange[600]
    }
  ];

  const portfoliosMap = portfolios.reduce((accumulator, ele) => {
    accumulator[ele.title] = {
      datasets: ele.data,
      allocations: ele.allocations
    };
    return accumulator;
  }, {});

  if (portfolioType) {
    data = portfoliosMap[portfolioType].datasets;
    devices = portfoliosMap[portfolioType].allocations;
  }

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  return (
    <Card {...props}>
      <CardHeader title="Asset Allocations" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: 'relative'
          }}
        >
          <Doughnut data={data} options={options} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 6
          }}
        >
          {devices.map(({ color, title, value }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: 'center'
              }}
            >
              <Typography color="textPrimary" variant="body1">
                {title}
              </Typography>
              <Typography style={{ color }} variant="h2">
                {value}
                %
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

AssetAllocations.propTypes = {
  portfolioType: propTypes.string
};

export default AssetAllocations;
