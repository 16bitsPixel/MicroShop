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

  async create(productRequest: ProductRequest, token: string): Promise<Product | undefined> {
    console.log("got here");

    // separate quantity out
    const myProductRequest = {
      "name": productRequest.name,
      "description": productRequest.description,
      "price": productRequest.price,
      "image": productRequest.image
    };

    const res = await fetch(`http://localhost:9000/api/product`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }),
      body: JSON.stringify(myProductRequest),
    }).then((res) => {
      return res.json();
    })
    .catch((e) => {
      console.log(e.toString());
    });

    return res;
  }

}

