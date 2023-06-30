import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { useEffect, useState } from 'react';

// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';
import { getClientSales, getClients } from '../sections/@dashboard/products/DB/dbFiles';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const [sales, setSales] = useState([]);

  const getSales = async () => {
    const sales = await getClientSales(localStorage.getItem('id'));
    setSales(sales);
    console.log(sales);
  };

  useEffect(() => {
    getSales();
  }, []);

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Historial Compras
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={sales.map((i, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: Date(i.fechaVenta),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Detalle de Compra"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
