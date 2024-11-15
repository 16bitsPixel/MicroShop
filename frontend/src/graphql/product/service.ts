import type { Product } from './schema'

export class ProductService{
  async getAll(): Promise<Product[]> {
    const res = await fetch(`http://localhost:9000/api/product`)
    return res.json();
  }

  async get(productId: string): Promise<Product> {
    const res = await fetch(`http://localhost:3012/api/v0/product/product/?productId=${productId}`)
    return res.json();
  }

  async search(query: string): Promise<Product[]> {
    const res = await fetch(`http://localhost:3012/api/v0/product/search?query=${query}`);
    return res.json();
  }
}

