import { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
// mocks_
import account from '../../../_mock/account';
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

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = (action) => {
    if (action === 'delete') deleteProduct(product);
    else {
      openFilter();
    }
    setOpen(null);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
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
        <EditIcon sx={{ color: '#FFF' }} />
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
