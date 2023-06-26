import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Typography, Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';
import { ColorPreview } from '../../../components/color-utils';
import EditarPopover from './EditarPopover';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
  openFilter: PropTypes.func,
};

export default function ShopProductCard({ product, openFilter }) {
  const { name, cover, price, colors, status, priceSale, stock, description } = product;
  console.log(product);
  return (
    <Card sx={{ backgroundColor: '#234451' }}>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {status && (
          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {status}
          </Label>
        )}
        <StyledProductImg alt={name} src={cover} />
      </Box>

      <Stack
        spacing={2}
        sx={{ marginTop: 1, marginLeft: 2 }}
        direction="row"
        alignItems="center"
        justifyContent="stretch"
      >
        <Typography variant="subtitle2" noWrap color="#B3B6B7">
          En inventario: {stock}
        </Typography>
        <EditarPopover product={product} openFilter={openFilter} />
      </Stack>

      <Stack spacing={2} sx={{ p: 2 }}>
        <Link color="#fff" underline="hover">
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>

        <Typography variant="subtitle2" noWrap>
          {description}
        </Typography>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <ColorPreview colors={colors} />
          <Typography variant="subtitle1" sx={{ color: '#fff' }}>
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through',
              }}
            >
              {priceSale && fCurrency(priceSale)}
            </Typography>
            &nbsp;
            {fCurrency(price)}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
