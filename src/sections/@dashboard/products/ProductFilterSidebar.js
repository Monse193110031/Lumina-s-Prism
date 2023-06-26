import PropTypes from 'prop-types';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';

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
  styled,
} from '@mui/material';
// components
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import { createProduct, getImage, handleFileUpload } from './DB/dbFiles';
import { ColorMultiPicker } from '../../../components/color-utils';
import ProveedorSelect from '../providers/providersLits';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

ShopFilterSidebar.propTypes = {
  openFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
};

export const ProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export default function ShopFilterSidebar({ openFilter, onOpenFilter, onCloseFilter }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState(0);
  const [file, setFile] = useState();
  const [fileDir, setFileDir] = useState('');
  const [isLoading, setLoading] = useState(false);

  const handleProductClick = async () => {
    try {
      console.log(name, price, description);
      setLoading(true);
      const { path } = await handleFileUpload(file);
      const { publicUrl } = await getImage(path);
      const result = await createProduct({
        nombreModelo: name,
        existencia: stock,
        caracteristicas: description,
        precioProducto: price,
        idProveedor: 1,
        url: publicUrl,
      });
      setLoading(false);
    } catch (error) {
      alert(error);
      setLoading(false);
    }
  };

  const handleFile = (event) => {
    console.log(event);
    const file = event.target.files[0];
    setFileDir(URL.createObjectURL(file));
    console.log(file);
    setFile(file);
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
              label="Inventario"
              InputLabelProps={{
                shrink: true,
              }}
              type="numeric"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />{' '}
            <TextField
              id="outlined-number"
              label="Descripcion"
              InputLabelProps={{
                shrink: true,
              }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button variant="contained" component="label">
              Cargar imagen
              <input hidden accept="image/*" multiple type="file" onChange={(event) => handleFile(event)} />
            </Button>
            <ProductImg src={fileDir} />
          </Stack>
        </Scrollbar>

        <Box sx={{ p: 3 }}>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="outlined"
            onClick={() => handleProductClick()}
            loading={isLoading}
          >
            Añadir
          </LoadingButton>
        </Box>
      </Drawer>
    </>
  );
}
