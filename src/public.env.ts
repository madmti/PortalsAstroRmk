import { config } from "dotenv";
if (!process.env.BACKEND_URL_REST || !process.env.WEBSOCKET_URL){ console.log('ERROR GETTING -> process.env.BACKEND_URL'); config(); };

export const BACKEND_URL = import.meta.env.BACKEND_URL_REST || 'ERROR';
export const WEBSOCKET_URL = import.meta.env.WEBSOCKET_URL || 'ERROR';