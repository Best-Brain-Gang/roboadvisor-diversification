import moment from 'moment';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const orders = [
  {
    id: uuid(),
    ref: 'Conservative',
    amount: '$10,000.50',
    exchange: {
      name: 'Alpaca'
    },
    createdAt: 1555016400000,
    status: 'pending'
  },
  {
    id: uuid(),
    ref: 'XLU',
    amount: '$20,340.50',
    exchange: {
      name: 'Alpaca'
    },
    createdAt: 1555016400000,
    status: 'fulfilled'
  },
  {
    id: uuid(),
    ref: 'XLK',
    amount: '$10,540.50',
    exchange: {
      name: 'Alpaca'
    },
    createdAt: 1554930000000,
    status: 'fulfilled'
  },
  {
    id: uuid(),
    ref: 'Moderate',
    amount: '$5,000.50',
    exchange: {
      name: 'Alpaca'
    },
    createdAt: 1554757200000,
    status: 'fulfilled'
  },
  {
    id: uuid(),
    ref: 'QQQ',
    amount: '$3,000.20',
    exchange: {
      name: 'Alpaca'
    },
    createdAt: 1554670800000,
    status: 'fulfilled'
  },
  {
    id: uuid(),
    ref: 'Agressive',
    amount: '$25,300.50',
    exchange: {
      name: 'Alpaca'
    },
    createdAt: 1554670800000,
    status: 'fulfilled'
  }
];

const LatestTrades = (props) => (
  <Card {...props}>
    <CardHeader title="Latest Trades" />
    <Divider />
    <PerfectScrollbar>
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Ticker/Portfolio
              </TableCell>
              <TableCell>
                Exchange/API
              </TableCell>
              <TableCell sortDirection="desc">
                <Tooltip
                  enterDelay={300}
                  title="Sort"
                >
                  <TableSortLabel
                    active
                    direction="desc"
                  >
                    Date
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell>
                Amount
              </TableCell>
              <TableCell>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                hover
                key={order.id}
              >
                <TableCell>
                  {order.ref}
                </TableCell>
                <TableCell>
                  {order.exchange.name}
                </TableCell>
                <TableCell>
                  {moment(order.createdAt).format('DD/MM/YYYY')}
                </TableCell>
                <TableCell>
                  {order.amount}
                </TableCell>
                <TableCell>
                  <Chip
                    color="primary"
                    label={order.status}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </PerfectScrollbar>
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
        View all
      </Button>
    </Box>
  </Card>
);

export default LatestTrades;
