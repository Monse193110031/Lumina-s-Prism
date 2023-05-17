import PropTypes from 'prop-types';
import { useState } from 'react';

// @mui
import {
  Box,
  Radio,
  Stack,
  Button,
  Drawer,
  Rating,
  Divider,
  Checkbox,
  FormGroup,
  IconButton,
  Typography,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
// components
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import { createProduct, handleFileUpload } from './DB/dbFiles';
import { ColorMultiPicker } from '../../../components/color-utils';
import ProveedorSelect from '../providers/providersLits';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

ShopFilterSidebar.propTypes = {
  openFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
};

export default function ShopFilterSidebar({ openFilter, onOpenFilter, onCloseFilter }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');

  const handleProductClick = () => {
    console.log(name, price, description);
    createProduct({
      nombreModelo: name,
      especificaciones: 'es',
      caracteristicas: description,
      precioProducto: price,
      idProveedor: 1,
    });
  };

  return (
    <>
      <Button disableRipple color="inherit" onClick={onOpenFilter}>
        Agregar Productos&nbsp;
      </Button>

      <Drawer
        anchor="right"
        open={openFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 280, border: 'none', overflow: 'hidden' },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            Agregar producto
          </Typography>
          <IconButton onClick={onCloseFilter}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3 }}>
            <Box>
              Proveedores
              <ProveedorSelect />
            </Box>

            <TextField
              id="Nombre"
              label="Nombre del producto"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="outlined-adornment-amount">Precio</InputLabel>
              <OutlinedInput
                id="Precio"
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                label="Amount"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </FormControl>
            <TextField
              id="outlined-number"
              label="En inventario"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button variant="contained" component="label">
              Cargar imagen
              <input hidden accept="image/*" multiple type="file" onChange={handleFileUpload} />
            </Button>
          </Stack>
        </Scrollbar>

        <Box sx={{ p: 3 }}>
          <Button
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="outlined"
            onClick={() => handleProductClick()}
          >
            Añadir
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
