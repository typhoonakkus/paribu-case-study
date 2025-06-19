let token: string | null = null;

export const TokenStore = {
  setToken: (newToken: string) => {
    token = newToken;
  },
  getToken: () => token,
};
