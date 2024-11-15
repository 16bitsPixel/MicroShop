import type { Product } from './schema'

export class ProductService{
  async getAll(): Promise<Product[]> {
    return [
        {
            'id' : '1',
            'name': 'test',
            'price': 100,
            'image': ['https://m.media-amazon.com/images/I/510jrZgVARL._AC_UF894,1000_QL80_.jpg']
        }
    ];
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

