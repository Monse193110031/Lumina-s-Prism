import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Container, Typography } from '@mui/material';
import { AppOrderTimeline } from '../sections/@dashboard/app';
import { selectProducts, purchase, selectCount, selectTotal, selectProductsTotals } from '../store/shoppingCartSlice';
import {
  createSale,
  createSaleDetail,
  quoteSale,
  updateInventory,
  updatebalance,
} from '../sections/@dashboard/products/DB/dbFiles';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const products = useSelector(selectProducts);
  const totalVenta = useSelector(selectTotal);
  const productsTotals = useSelector(selectProductsTotals);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePurschae = async () => {
    const { saldo } = await quoteSale(localStorage.getItem('id'));
    console.log(products);
    console.log(saldo);
    console.log('totals', productsTotals);
    console.log('prods', products);
    const hasEnoughMoney = saldo > totalVenta;
    if (totalVenta === 0) {
      toast('😨 No hay productos en el carrito');
      return;
    }
    toast(
      hasEnoughMoney
        ? `😎 Compra realizada con exito, tu cambio es de $ ${saldo - totalVenta} `
        : `😨 No tiene suficiente dinero, te faltan $ ${totalVenta - saldo} `,
      { autoClose: 1000 }
    );
    if (!hasEnoughMoney) return;

    const { idVenta } = await createSale({
      totalVenta,
      idCliente: localStorage.getItem('id'),
    });

    Object.keys(productsTotals).forEach(async (k) => {
      await createSaleDetail({
        idVenta,
        idProducto: productsTotals[k].id,
        cantidad: productsTotals[k].quantity,
        precio: productsTotals[k].price,
      });

      await updateInventory(productsTotals[k].id, productsTotals[k].stock - productsTotals[k].quantity);
    });

    await updatebalance(localStorage.getItem('id'), saldo - totalVenta);
    setTimeout(() => {
      window.print();
      dispatch(purchase());
      navigate('/clients/history');
    }, 3000);
  };

  useEffect(() => {}, []);

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Detalle Compra
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              list={products.map((p, index) => ({
                id: faker.datatype.uuid(),
                title: p.name,
                type: `order${index + 1}`,
                time: p.price,
                quantity: p.cantidad,
                url: p.cover,
              }))}
            />
          </Grid>
        </Grid>
        <LoadingButton fullWidth size="medium" type="submit" variant="contained" onClick={handlePurschae}>
          Comprar
        </LoadingButton>
      </Container>
    </>
  );
}
