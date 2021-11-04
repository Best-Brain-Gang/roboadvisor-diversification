import { v4 as uuid } from 'uuid';
import { colors } from '@material-ui/core';

export default [
  {
    id: uuid(),
    createdAt: '31/03/2019',
    description:
      'Conservative gives high priority to treasury bonds with 40% allocation to mitigate draw down risk.',
    media: '/static/images/products/product_2.png',
    title: 'Conservative',
    totalDownloads: '625',
    allocations: [
      {
        title: 'Stocks',
        value: 60,
        color: colors.indigo[500]
      },
      {
        title: 'Bonds',
        value: 40,
        color: colors.red[600]
      }
    ],
    data: {
      datasets: [
        {
          data: [60, 40],
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
      labels: ['Stocks', 'Bonds']
    }
  },
  {
    id: uuid(),
    createdAt: '03/04/2019',
    description: 'Mixture of conservative and agressive',
    media: '/static/images/products/product_3.png',
    title: 'Moderate',
    totalDownloads: '857',
    allocations: [
      {
        title: 'Stocks',
        value: 80,
        color: colors.indigo[500]
      },
      {
        title: 'Bonds',
        value: 20,
        color: colors.red[600]
      }
    ],
    data: {
      datasets: [
        {
          data: [80, 20],
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
      labels: ['Stocks', 'Bonds']
    }
  },
  {
    id: uuid(),
    createdAt: '04/04/2019',
    description:
      'Aggressive fully allocates to equity positions and utilizes a neural nets trading system to slightly offset the risk while trying to maximize returns.',
    media: '/static/images/products/product_4.png',
    title: 'Aggressive',
    totalDownloads: '406',
    allocations: [
      {
        title: 'Stocks',
        value: 100,
        color: colors.indigo[500]
      }
    ],
    data: {
      datasets: [
        {
          data: [100],
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
      labels: ['Stocks']
    }
  }
];
