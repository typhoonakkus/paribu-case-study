export const ProductService = {
  getTokenFromDefaultUser: async () => {
    const res = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'kminchelle', password: '0lelplR' }),
    });
    const body = await res.json();
    return { token: body.token };
  },

  getProducts: async (token: string, limit: number = 10) => {
    return await fetch(`https://dummyjson.com/auth/products?limit=${limit}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  updateProduct: async (token: string, productId: number, payload: any) => {
    return await fetch(`https://dummyjson.com/auth/products/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
  },

  deleteProduct: async (token: string, productId: number) => {
    return await fetch(`https://dummyjson.com/auth/products/${productId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
