import 'dotenv/config';
const { PORT, NODE_ENV } = process.env;

export const config = {
  application: {
    PORT: PORT,
    environment: NODE_ENV,
  },
};
