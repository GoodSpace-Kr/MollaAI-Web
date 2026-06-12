export const IS_DEV_MODE = import.meta.env.DEV;

export const FRONTEND_URL = IS_DEV_MODE
  ? "http://localhost:3000"
  : "https://www.mollatalk.com";

export const PAYMENT_CALLBACK_URL = `${FRONTEND_URL}/payment/callback`;
