import type { Order, OrderRequest } from './schema'

export class OrderService{
  async orderProduct(orderRequest: OrderRequest, token: string): Promise<Order | undefined> {

    const orderResponse = await fetch(`http://localhost:9000/api/order`, {
      method: 'POST',
      headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
      }),
      body: JSON.stringify(orderRequest),
  });

    return orderResponse.json();
  }
}

