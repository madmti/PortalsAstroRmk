import express from 'express';
import morgan from 'morgan';
import { enable } from 'colors';
import { handler as ssrHandler } from './dist/server/entry.mjs';
enable();

const baseURL = '/';
const PORT = 4321;
const app = express();
app.use(morgan('dev'));
app.use(baseURL, express.static('./dist/client/'));
app.use(ssrHandler);

app.listen(PORT, () => {
    console.log('');
    console.log(' PORTALS:astro '.bgCyan);
    console.log(`✓ Running in port:${PORT}`.green);
});
