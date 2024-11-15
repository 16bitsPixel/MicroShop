import React from 'react';
import { SearchContext } from '@/context/SearchContext';
import { Product } from '../../graphql/product/schema'
import ProductCard from './ProductCard';
import Grid from '@mui/material/Grid';

interface FetchProductsParams {
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const fetchProducts = ({ setProducts, setError }: FetchProductsParams) => {
  const query = {
    query: `query product {
      product {
        id, name, price, image
      }
    }`}
  fetch('/api/graphql', {
    method: 'POST',
    body: JSON.stringify(query),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      return res.json()
    })
    .then((json) => {
      setError('')
      setProducts(json.data.product)
    })
    .catch((e) => {
      setError(e.toString())
      setProducts([])
    })
};

export default function ProductList() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [error, setError] = React.useState('Logged Out')

  React.useEffect(() => {
    fetchProducts({setProducts, setError});
  }, []);

    return (
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {products.map((product: Product, index) => (
          <Grid item xs={2} sm={2} md={2} key={index}>
            <ProductCard key = {product.id} id={product.id} name={product.name} price={product.price} /*rating={product.rating}*/ image={product.image[0]}/>
          </Grid>
        ))}
      </Grid>
    )
}
