if (!process.env.BACKEND_URL_REST){ console.log('ERROR GETTING -> process.env.BACKEND_URL') };

export const BACKEND_URL = import.meta.env.BACKEND_URL_REST || 'ERROR';