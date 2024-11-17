import React from 'react';

import Header from './components/Header';

import { Product } from '@/graphql/product/schema';
import { ProductImage } from './components/ProductImage';
import { Divider, Box, Grid, Typography, Button, TextField, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

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

interface FetchQuantityParams {
  id: string | string[] | undefined;
  setInventory: any;
}

const fetchQuantity = ({ id, setInventory }: FetchQuantityParams) => {
  const query = {
    query: `query GetQuantity {
      quantity(productId: "${id}")
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
      setInventory(json.data.quantity);
    })
    .catch((e) => {
      alert(e.toString());
      setInventory(0);
    });
};

interface ProductProps {
  id: string | string[] | undefined;
}

export function ProductView({ id }: ProductProps) {
  const [product, setProduct] = React.useState<Product | undefined>(undefined);
  const [quantity, setQuantity] = React.useState(1);
  const [inventory, setInventory] = React.useState(0);


  React.useEffect(() => {
    fetchProduct({ id, setProduct });
    fetchQuantity({id, setInventory });
  }, [id]);

  const handlePurchase = () => {
    alert(`Purchasing ${quantity} of ${product?.name}`);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
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
          <Grid
            container
            spacing={2}
            sx={{
              minHeight: { xs: 'auto', sm: '60vh', md: '80vh' },
              alignItems: 'center',
            }}
          >
            {/* Image Grid */}
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box>
                <ProductImage image={product.image} />
              </Box>
            </Grid>

            {/* Product Info Grid */}
            <Grid item xs={12} sm={6} sx = {{display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', height: '100%'}}>
              <Box>
                {/* Product Name */}
                <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 2, fontSize: { xs: '3rem', xl: '5rem' } }}>
                  {product.name}
                </Typography>

                {/* Product Price */}
                <Typography variant="h5" sx={{ color: 'primary.main', marginBottom: 2, fontSize: { xs: '1.8rem', xl: '3rem' } }}>
                  ${product.price}
                </Typography>

                {/* Product Stock */}
                <Typography variant="h5" sx={{ color: 'green', marginBottom: 2, fontSize: { xs: '1.5rem', xl: '2.7rem' } }}>
                  {inventory} Left In Stock
                </Typography>
              </Box>

              <Divider/>


              {/* Product Description */}
              <Typography
                variant="body1"
                sx={{ fontSize: { xs: '1rem', sm: '1.2rem', xl: '2.5rem' }, lineHeight: 1.6, marginBottom: 2 }}
              >
                {product.description}
              </Typography>

              <Divider/>

              <Box>
                {/* Quantity Input */}
                <Box display="flex" alignItems="center" sx={{ marginBottom: 2 }}>
                  <IconButton onClick={decrementQuantity}>
                    <RemoveIcon />
                  </IconButton>
                  <TextField
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    inputProps={{
                      min: 1,
                      style: { textAlign: 'center' },
                    }}
                    sx={{ width: '80px', marginX: 1 }}
                  />
                  <IconButton onClick={incrementQuantity}>
                    <AddIcon />
                  </IconButton>
                </Box>

                {/* Purchase Button */}
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ fontSize: '1.1rem', padding: '12px', maxWidth: '250px', display: 'block' }}
                  onClick={handlePurchase}
                >
                  Purchase
                </Button>
              </Box>
            </Grid>
          </Grid>
        ) : (
          <h1>Product does not exist</h1>
        )}
      </Box>
    </>
  );
}
