// @mui
import { styled } from '@mui/material/styles';
import { Badge, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import {
  purchase,
  selectCount,
  selectProducts,
  selectProductsTotals,
  selectTotal,
} from '../../../store/shoppingCartSlice';

// component
import Iconify from '../../../components/iconify';
import { createSale, createSaleDetail, quoteSale, updateInventory, updatebalance } from './DB/dbFiles';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  zIndex: 999,
  right: 0,
  display: 'flex',
  cursor: 'pointer',
  position: 'fixed',
  alignItems: 'center',
  top: theme.spacing(16),
  height: theme.spacing(8),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1.25),
  boxShadow: theme.customShadows.z20,
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.background.paper,
  borderTopLeftRadius: Number(theme.shape.borderRadius) * 2,
  borderBottomLeftRadius: Number(theme.shape.borderRadius) * 2,
  transition: theme.transitions.create('opacity'),
  '&:hover': { opacity: 0.72 },
}));

// ----------------------------------------------------------------------

export default function CartWidget() {
  const count = useSelector(selectCount);
  const totalVenta = useSelector(selectTotal);
  const products = useSelector(selectProducts);
  const productsTotals = useSelector(selectProductsTotals);
  const dispatch = useDispatch();

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
        : `😨 No tiene suficiente dinero, te faltan $ ${totalVenta - saldo} `
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

    console.log(idVenta);
    dispatch(purchase());
    window.print();
  };

  return (
    <StyledRoot onClick={handlePurschae}>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <Badge badgeContent={count} color="error" max={99}>
          <Iconify icon="eva:shopping-cart-fill" width={24} height={24} />
        </Badge>
        {totalVenta}
      </Box>
    </StyledRoot>
  );
}
