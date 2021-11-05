import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  colors
} from '@material-ui/core';
import moment from 'moment';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Alpaca from '@alpacahq/alpaca-trade-api';

const Sales = (props) => {
  const theme = useTheme();
  const [portfolioData, setPortfolioData] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    if (process.env.REACT_APP_API_KEY && process.env.REACT_APP_APCA_API_SECRET_KEY) {
      const alpaca = new Alpaca({
        keyId: process.env.REACT_APP_API_KEY,
        secretKey: process.env.REACT_APP_APCA_API_SECRET_KEY,
        paper: true
      });
      alpaca.getPortfolioHistory({
        period: '7D',
        timeframe: '1H'
      }).then((portfolio) => {
        // Print the quantity of shares for each position.
        setPortfolioData(portfolio.equity);
        setLabels(portfolio.timestamp.map((timestamp) => moment.unix(timestamp).format('lll')));
      });
    } else {
      setPortfolioData([100000, 100555, 100600, 100880, 101002, 102222, 103450]);
      setLabels(['1 Aug', '2 Aug', '3 Aug', '4 Aug', '5 Aug', '6 Aug']);
    }
  }, []);

  const data = {
    datasets: [
      {
        backgroundColor: colors.indigo[500],
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: portfolioData,
        label: 'Total',
        maxBarThickness: 10
      },
    ],
    labels
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          }
        }
      ]
    },
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
      <CardHeader
        action={(
          <Button
            endIcon={<ArrowDropDownIcon />}
            size="small"
            variant="text"
          >
            Last 7 days
          </Button>
        )}
        title="Total Equity"
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: 'relative'
          }}
        >
          <Line
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          Overview
        </Button>
      </Box>
    </Card>
  );
};

export default Sales;
