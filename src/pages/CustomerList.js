import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import BotListResults from '../components/bot/BotListResults';
import BotListToolbar from '../components/bot/BotListToolbar';
import customers from '../__mocks__/customers';

const CustomerList = () => (
  <>
    <Helmet>
      <title>Customers | Material Kit</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <BotListToolbar />
        <Box sx={{ pt: 3 }}>
          <BotListResults customers={customers} />
        </Box>
      </Container>
    </Box>
  </>
);

export default CustomerList;
