import React from 'react';

import Header from './components/Header';

import { Product } from '@/graphql/product/schema';
import { ProductImage } from './components/ProductImage';
import { Divider, Box, Grid, Typography, Button } from '@mui/material';

interface FetchProductParams {
  id: string | string[] | undefined;
  setProduct: React.Dispatch<React.SetStateAction<Product | undefined>>;
}

const fetchProduct = ({ id, setProduct }: FetchProductParams) => {
  const query = {
    query: `query GetProduct {
      productInfo(productId: "${id}") {
        id, name, description, price, image
      }
    }`,
  };
  fetch('/api/graphql', {
    method: 'POST',
    body: JSON.stringify(query),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      setProduct(json.data.productInfo);
    })
    .catch((e) => {
      alert(e.toString());
      setProduct(undefined);
    });
};

interface ProductProps {
  id: string | string[] | undefined;
}

export function ProductView({ id }: ProductProps) {
  const [product, setProduct] = React.useState<Product | undefined>(undefined);

  React.useEffect(() => {
    fetchProduct({ id, setProduct });
  }, [id]);

  const handlePurchase = () => {
    // Handle the purchase logic here, e.g., adding to cart or navigating to checkout
    alert(`Purchasing ${product?.name}`);
  };

  return (
    <>
      <Header />
      <Box
        style={{
          paddingTop: '5rem',
          display: 'flex',
          justifyContent: 'center',
          marginLeft: '2rem',
          marginRight: '2rem',
        }}
      >
        {product ? (
          <Grid container spacing={2}>
            {/* Image Grid */}
            <Grid item xs={12} sm={6}>
              <Box display="flex" justifyContent="center">
                <ProductImage image={product.image} />
              </Box>
            </Grid>

            {/* Product Info Grid */}
            <Grid item xs={12} sm={6}>
              {/* Product Name */}
              <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                {product.name}
              </Typography>

              {/* Product Price */}
              <Typography variant="h5" sx={{ color: 'primary.main', marginBottom: 2 }}>
                ${product.price}
              </Typography>

              {/* Product Description */}
              <Typography
                variant="body1"
                sx={{ fontSize: { xs: '1rem', sm: '1.2rem' }, lineHeight: 1.6, marginBottom: 2 }}
              >
                {product.description}
              </Typography>

              {/* Purchase Button */}
              <Button
                variant="contained"
                color="primary"
                sx={{ fontSize: '1.1rem', padding: '12px', maxWidth: '250px', display: 'block' }}
                onClick={handlePurchase}
              >
                Purchase
              </Button>
            </Grid>
          </Grid>
        ) : (
          <h1>Product does not exist</h1>
        )}
      </Box>
    </>
  );
}
