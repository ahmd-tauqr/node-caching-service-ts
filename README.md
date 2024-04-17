## Installation

Follow these steps to get the project up and running on your local machine:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/ahmd-tauqr/node-caching-service-ts.git
   cd node-caching-service-ts
   ```

2. **Install Dependencies**

   Navigate to the project directory and install the necessary dependencies:

   ```bash
   npm install
   ```

3. **Compile TypeScript**

   Compile the TypeScript files to JavaScript using the TypeScript compiler:

   ```bash
   npx tsc
   ```

4. **Start the Server**

   Run the compiled JavaScript with Node.js:

   ```bash
   node dist/index.js
   ```

   This starts the server on `http://localhost:3000`.

5. **Encode an Image URL to Base64**

   Before you can cache an image through the server, you need to encode the image URL into Base64. A utility script is included for this purpose:

   ```bash
   node dist/encodeUrl.js
   ```

   Replace the `imageUrl` in the `encodeUrl.js` script with the URL you need to encode. This will output the Base64 encoded URL, which you can then use with the caching server.

## Usage

To use the caching server, make a GET request to the server with the encoded URL of the image you want to cache and serve. For example:

```plaintext
http://localhost:3000/cache/{base64_encoded_url}
```

Where `{base64_encoded_url}` is the Base64 encoded version of the original image URL you wish to retrieve and cache.

### Example

If you want to cache and retrieve an image from `http://example.com/image.jpg`, you would:

1. Encode the URL in Base64 format.
2. Send a GET or HEAD request to `http://localhost:3000/cache/aHR0cDovL2V4YW1wbGUuY29tL2ltYWdlLmpwZw==`.