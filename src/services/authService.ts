export const AuthService = {
  getRandomUser: async () => {
    const res = await fetch('https://dummyjson.com/users');
    if (!res.ok) throw new Error('Failed to fetch users');

    const body = await res.json();
    const users = body.users;

    
    const randomUser = users[Math.floor(Math.random() * users.length)];
   
    const username = randomUser.username;
    const password = randomUser.password;

    return { username, password };
  },

  login: async (username: string, password: string) => {
    return await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
      redirect: 'follow', 
    });
  },
};
