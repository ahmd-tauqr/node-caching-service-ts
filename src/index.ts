import express from 'express';
import axios from 'axios';
import { Cache } from './Cache';
import { CacheEntry } from './types';
import { getContentType } from './utils';

const app = express();
const cache = new Cache();

app.get('/cache/:encodedUrl', async (req, res) => {
  const { encodedUrl } = req.params;
  const url = Buffer.from(encodedUrl, 'base64').toString('ascii');
  const contentType = getContentType(url);

  const cacheKey = url;

  try {
    let cacheEntry: CacheEntry | null = cache.get(cacheKey);
    let cacheHit = true;

    if (!cacheEntry) {
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      const cachedAt = new Date();
      const expiresAt = new Date(cachedAt.getTime() + 533280 * 1000);

      cacheEntry = {
        data: response.data,
        cachedAt: cachedAt,
        expiresAt: expiresAt,
      };

      cache.set(cacheKey, cacheEntry.data, 533280);
      cacheHit = false;
    }

    if (cacheEntry && cacheEntry.data) {
      res.setHeader('Content-Type', contentType);
      res.setHeader('Last-Modified', cacheEntry.cachedAt.toUTCString());
      res.setHeader('Cache-Control', 'public, max-age=533280');
      res.setHeader('Expires', cacheEntry.expiresAt.toUTCString());
      res.setHeader('X-Cache', cacheHit ? 'HIT' : 'MISS');
      res.send(cacheEntry.data);
    } else {
      throw new Error('No valid data available');
    }
  } catch (error) {
    console.error('Failed to retrieve image:', error);
    res.status(500).send('Error retrieving the image.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
