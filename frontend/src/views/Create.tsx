import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import Header from './components/Header';
import { ProductRequest } from '../graphql/product/schema';

const createProduct = (newProduct: ProductRequest, token: string) => {
  // const productRequestStr = JSON.stringify(newProduct).replace(/"([^"]+)":/g, '$1:');

    const query = {
      query: `mutation CreateProduct {
        createProduct(productRequest: {
          name: "${newProduct.name}",
          description: "${newProduct.description}",
          price: ${newProduct.price},
          quantity: ${newProduct.quantity},
          image: "${newProduct.image}"
        }, token: "${token}") {
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
        console.log(JSON.stringify);
        return res.json();
      })
      .catch((e) => {
        alert(e.toString());
      });
};

/*
const createProduct = (newProduct: ProductRequest, token: string|undefined) => {
    // separate quantity out
    const myProductRequest = {
        "name": newProduct.name,
        "description": newProduct.description,
        "price": newProduct.price,
        "image": newProduct.image
      };
  
      fetch(`http://localhost:9000/api/product`, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }),
        body: JSON.stringify(myProductRequest),
        })
      .then((response) => {
        if(!response.ok) {
            throw response;
        }
        return response.json();
      })
      .catch((error) => {
        console.log(error);
      });
};
*/

interface CreateProps {
    token: string | undefined;
}

export function CreateView({token}: CreateProps) {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    image: ""
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare data for backend (adjust the price and quantity to be numbers)
    const productRequest = {
      name: productData.name,
      description: productData.description,
      price: parseFloat(productData.price),  // Convert price to number
      quantity: parseInt(productData.quantity, 10),  // Convert quantity to number
      image: productData.image || undefined, // Use null if no image URL is provided
    };

    // You can send the productRequest to your backend
    console.log('Sending Product Request:', productRequest);
    createProduct(productRequest, token);

    // Clear the form
    setProductData({ name: '', description: '', price: '', quantity: '', image: '' });
  };

  return (
    <>
      <Header />
      <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2, paddingTop: {xl: '8rem'} }}>
        <Typography variant="h4" gutterBottom>
          Create New Product
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Product Name"
            name="name"
            value={productData.name}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />

          <TextField
            label="Description"
            name="description"
            value={productData.description}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            multiline
            rows={4}
          />

          <TextField
            label="Price"
            name="price"
            value={productData.price}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            type="number"
          />

          <TextField
            label="Image URL"
            name="image"
            value={productData.image}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Quantity"
            name="quantity"
            value={productData.quantity}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            type="number"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
          >
            Create Product
          </Button>
        </form>
      </Box>
    </>
  );
}
