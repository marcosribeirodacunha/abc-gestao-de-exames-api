/* eslint-disable @typescript-eslint/no-non-null-assertion */
export default {
  secret: process.env.AUTH_SECRET!,
  expiresIn: '1d',
};
