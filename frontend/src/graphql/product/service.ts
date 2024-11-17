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

  async getQuantity(productId: string): Promise<number> {
    const res = await fetch(`http://localhost:9000/api/inventory/${productId}`)
    return res.json();
  }

  async create(productRequest: ProductRequest, token: string): Promise<Product | undefined> {
    // Separate product creation request
    const myProductRequest = {
        name: productRequest.name,
        description: productRequest.description,
        price: productRequest.price,
        image: productRequest.image,
    };

    try {
        // First API call: Create product
        const productResponse = await fetch(`http://localhost:9000/api/product`, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }),
            body: JSON.stringify(myProductRequest),
        });

        if (!productResponse.ok) {
            throw new Error(`Failed to create product: ${productResponse.statusText}`);
        }

        const productData = await productResponse.json();

        // Extract the product ID for inventory creation
        const productId = productData?.id;
        if (!productId) {
            throw new Error('Product ID is missing in the response');
        }

        // Prepare inventory request
        const myInventoryRequest = {
            skuCode: productId,
            quantity: productRequest.quantity,
        };

        // Second API call: Create inventory
        const inventoryResponse = await fetch(`http://localhost:9000/api/inventory`, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }),
            body: JSON.stringify(myInventoryRequest),
        });

        if (!inventoryResponse.ok) {
            throw new Error(`Failed to create inventory: ${inventoryResponse.statusText}`);
        }

        const inventoryData = await inventoryResponse.json();

        // Return the product response (or combined data if necessary)
        return productResponse.json();
    } catch (error) {
        console.error('Error in create method:', error.toString());
        return undefined;
    }
}


}

