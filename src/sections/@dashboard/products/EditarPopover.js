import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
// mocks_
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment, selectCount } from '../../../store/shoppingCartSlice';
import { deleteProduct } from './DB/dbFiles';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Editar articulo',
    icon: 'eva:home-fill',
    action: 'edit',
  },
  {
    label: 'Eliminar articulo',
    icon: 'eva:settings-2-fill',
    action: 'delete',
  },
];

// ----------------------------------------------------------------------

export default function EditarPopover({ product, openFilter }) {
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isClient, setIsClient] = useState(pathname.includes('clients'));

  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const addProduct = () => {
    dispatch(increment(product));
  };

  const removeProduct = () => {
    dispatch(decrement(product));
  };

  const handleClose = (action) => {
    if (action === 'delete') {
      deleteProduct(product);
      navigate(0);
    } else {
      openFilter(product);
    }
    setOpen(null);
  };

  const removeButton = isClient && (
    <Box>
      <IconButton
        onClick={removeProduct}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <RemoveIcon sx={{ color: '#FFFFFF' }} />
      </IconButton>
    </Box>
  );
  return (
    <>
      {removeButton}
      <IconButton
        onClick={isClient ? addProduct : handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        {isClient ? <AddIcon sx={{ color: '#FFFFFF' }} /> : <EditIcon sx={{ color: '#FFFFFF' }} />}
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={() => handleClose(option.action)}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />
      </Popover>
    </>
  );
}
