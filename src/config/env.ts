const environments = {
  dev: {
    baseUrl: 'https://dev.paribu.com',
  },
  test: {
    baseUrl: 'https://test.paribu.com',
  },
  qa: {
    baseUrl: 'https://qa.paribu.com',
  },
  prod: {
    baseUrl: 'https://paribu.com',
  },
};

const env = process.env.TEST_ENV || 'prod'; // default: prod

export const config = environments[env as keyof typeof environments];
