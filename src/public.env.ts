if (!process.env.BACKEND_URL){ console.log('ERROR GETTING -> process.env.BACKEND_URL') };


export const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3000';