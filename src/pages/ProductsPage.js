import { Helmet } from 'react-helmet-async';

import { useEffect, useState } from 'react';
// @mui
import { Container, Stack, Typography, Button } from '@mui/material';
// components
import { useLocation } from 'react-router-dom';

import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';

// mock
import products from '../_mock/products';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [openFilter, setOpenFilter] = useState(false);
  const [prodcuts, setProducts] = useState([]);
  const [product, setProduct] = useState();

  const { pathname } = useLocation();
  const [isClient, setIsClient] = useState(pathname.includes('clients'));

  const retrieveProducts = async () => {
    const result = await products();
    setProducts(result);
  };

  useEffect(() => {
    retrieveProducts();
  }, []);

  const handleOpenFilter = (product) => {
    console.log(product);
    setProduct(product);
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const productsAdd = !isClient && (
    <ProductFilterSidebar
      product={product}
      openFilter={openFilter}
      onOpenFilter={handleOpenFilter}
      onCloseFilter={handleCloseFilter}
    />
  );

  return (
    <>
      <Helmet>
        <title> Dashboard: Products | Minimal UI </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Productos
        </Typography>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            {productsAdd}
          </Stack>
        </Stack>

        <ProductList products={prodcuts} openFilter={handleOpenFilter} />
        <ProductCartWidget />
      </Container>
    </>
  );
}
