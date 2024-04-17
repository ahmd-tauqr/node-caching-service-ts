const imageUrl =
  'https://www.dpreview.com/files/p/articles/7961724650/Lesson-4-Yarra-Ranges-Road-Black-Spur-Mountain-Ash.jpeg';

const encodedUrl = Buffer.from(imageUrl).toString('base64');

console.log('Base64 Encoded URL:', encodedUrl);
