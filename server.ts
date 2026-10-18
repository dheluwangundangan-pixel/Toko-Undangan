import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// Cloud Run injects PORT (e.g. 8080)
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Path to compiled frontend assets
const distPath = path.resolve(__dirname, 'dist');

// Serve static assets from dist
app.use(express.static(distPath));

// Health check endpoint
app.get('/healthz', (_req, res) => {
  res.status(200).send('OK');
});

// SPA fallback for all other routes
app.get('*', (_req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(200).send('Dheluwang Undangan is ready.');
  }
});

app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`Dheluwang Undangan server running on http://0.0.0.0:${PORT}`);
});
