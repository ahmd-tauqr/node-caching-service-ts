import express from 'express';
import axios from 'axios';
import NodeCache from 'node-cache';

interface CacheEntry {
  data: Buffer;
  cachedAt: Date;
  expiresAt: Date;
}

const app = express();
const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

app.get('/cache/:encodedUrl', async (req, res) => {
  const { encodedUrl } = req.params;
  const url = Buffer.from(encodedUrl, 'base64').toString('ascii');

  try {
    let cacheEntry = cache.get<CacheEntry>(url);
    let cacheHit = true;

    if (!cacheEntry) {
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      const cachedAt = new Date();
      let expiresAt = new Date(cachedAt.getTime() + 533280 * 1000);

      cacheEntry = {
        data: response.data,
        cachedAt: cachedAt,
        expiresAt: expiresAt,
      };

      cache.set(url, cacheEntry);
      cacheHit = false;
    }

    res.setHeader('Content-Type', 'image/jpeg'); 
    res.setHeader('Last-Modified', cacheEntry.cachedAt.toUTCString());
    res.setHeader('Cache-Control', 'public, max-age=533280');
    res.setHeader('Expires', cacheEntry.expiresAt.toUTCString());
    res.setHeader('X-Cache', cacheHit ? 'HIT' : 'MISS');

    res.send(cacheEntry.data);
  } catch (error) {
    console.error('Failed to retrieve image:', error);
    res.status(500).send('Error retrieving the image.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
