import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid,
} from '@material-ui/core';
import PortfolioListToolbar from '../components/portfolio/PortfolioListToolbar';
import PortfolioCard from '../components/portfolio/PortfolioCard';
import portfolios from '../__mocks__/portfolios';

const ProductList = () => (
  <>
    <Helmet>
      <title>Products | Material Kit</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <PortfolioListToolbar />
        <Box sx={{ pt: 3 }}>
          <Grid
            container
            spacing={3}
          >
            {portfolios.map((portfolio) => (
              <Grid
                item
                key={portfolio.id}
                lg={4}
                md={6}
                xs={12}
              >
                <PortfolioCard product={portfolio} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  </>
);

export default ProductList;
