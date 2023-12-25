if (!process.env.BACKEND_URL){ console.log('ERROR GETTING -> process.env.BACKEND_URL') };


export const BACKEND_URL = process.env.BACKEND_URL_REST || 'http://localhost:3000';