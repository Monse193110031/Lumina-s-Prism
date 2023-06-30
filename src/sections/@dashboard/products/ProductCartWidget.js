// @mui
import { styled } from '@mui/material/styles';
import { Badge, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { selectCount, selectTotal } from '../../../store/shoppingCartSlice';

// component
import Iconify from '../../../components/iconify';

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
  const navigate = useNavigate();

  const handlePurschae = async () => {
    navigate('/clients/sale');
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
