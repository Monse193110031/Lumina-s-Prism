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
import { getClientSales, getClientSalesDetail, getClients } from '../sections/@dashboard/products/DB/dbFiles';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);

  const getSales = async (i) => {
    const salesDetail = await getClientSales(localStorage.getItem('id'));
    const sorted = salesDetail.sort((a, b) => a.idVenta < b.idVenta);
    console.log('sorted', sorted);
    setSales(sorted);
    if (salesDetail.length > 0) getProds(sales[i].idVenta);
  };

  const getProds = async (salesId) => {
    const saleDDetail = await getClientSalesDetail(salesId);
    setProducts(saleDDetail);
  };

  useEffect(() => {
    getSales(4);
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
              onclick={getProds}
              list={sales.map((i, index) => ({
                id: i.idVenta,
                title: `${i.idVenta}`,
                description: i.totalVenta,
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: new Date(i.fecha),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Detalle de Compra"
              list={products.map((p, index) => ({
                id: faker.datatype.uuid(),
                title: p.Producto.nombreModelo,
                type: `order${index + 1}`,
                time: p.precio,
                quantity: p.cantidad,
                url: p.Producto.url,
              }))}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
