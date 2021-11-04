import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import { useState } from 'react';
import Budget from '../components/dashboard/Budget';
import LatestTrades from '../components/dashboard/LatestTrades';
import CumulativeReturns from '../components/dashboard/CumulativeReturns';
import TasksProgress from '../components/dashboard/TasksProgress';
import TotalCustomers from '../components/dashboard/TotalCustomers';
import TotalProfit from '../components/dashboard/TotalProfit';
import AssetAllocations from '../components/dashboard/AssetAllocations';
import LexChat from '../components/chatbot/LexChat';

const Dashboard = () => {
  const [portfolioType, setPortfolioType] = useState('');

  const handlePortfolioChange = (newPortfolio) => {
    setPortfolioType(newPortfolio);
  };

  return (
    <>
      <Helmet>
        <title>Dashboard | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              <AssetAllocations portfolioType={portfolioType} sx={{ height: '100%' }} />
            </Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              <CumulativeReturns />
            </Grid>
            <Grid item lg={12} md={12} xl={12} xs={12}>
              <LatestTrades />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <Budget />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TotalCustomers />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TasksProgress />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TotalProfit sx={{ height: '100%' }} />
            </Grid>
          </Grid>
          <LexChat
            botName="roboAdvisorDiversification"
            IdentityPoolId="us-west-2:e528a8da-fd69-4449-98e9-1509f8ea08c8"
            placeholder="Type your message and hit Enter"
            style={{ position: 'absolute' }}
            backgroundColor="#FFFFFF"
            height="430px"
            region="us-west-2"
            headerText="Robo Advisor"
            handlePortfolioChange={handlePortfolioChange}
          />
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
