// @mui
import { styled } from '@mui/material/styles';
import { Badge, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { purchase, selectCount, selectProducts, selectTotal } from '../../../store/shoppingCartSlice';

// component
import Iconify from '../../../components/iconify';
import { createSale, createSaleDetail, quoteSale, updatebalance } from './DB/dbFiles';

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
  const dispatch = useDispatch();

  const handlePurschae = async () => {
    const { saldo } = await quoteSale(localStorage.getItem('id'));
    console.log(saldo);
    const hasEnoughMoney = saldo > totalVenta;
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
    products.forEach(async (product) => {
      await createSaleDetail({
        idVenta,
        idProducto: product.id,
        cantidad: product.quantity,
      });
    });

    await updatebalance(localStorage.getItem('id'), saldo - totalVenta);

    console.log(idVenta);
    dispatch(purchase());
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
