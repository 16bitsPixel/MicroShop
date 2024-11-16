import type { Product, ProductRequest } from './schema'

export class ProductService{
  async getAll(): Promise<Product[]> {
    const res = await fetch(`http://localhost:9000/api/product`)
    return res.json();
  }

  async get(productId: string): Promise<Product> {
    const res = await fetch(`http://localhost:9000/api/product/${productId}`)
    return res.json();
  }

  async create(productRequest: ProductRequest): Promise<Product> {
    const res = await fetch(`http://localhost:9000/api/product`, {
      method: 'POST',
      headers: {
        'Content-Type': 'applicaiton/json',
      },
      body: JSON.stringify(productRequest),
    });

    if (!res.ok) {
      throw new Error(`Failed to create product: ${res.statusText}`);
    }
    
    return res.json();
  }

}

