const imageUrl =
  'https://www.dpreview.com/files/p/articles/7961724650/Lesson-4-Yarra-Ranges-Road-Black-Spur-Mountain-Ash.jpeg';

const imageUrl1 =
  'https://static.vecteezy.com/system/resources/previews/024/705/100/non_2x/dolphin-with-ai-generated-free-png.png';

const encodedUrl = Buffer.from(imageUrl1).toString('base64');

console.log('Base64 Encoded URL:', encodedUrl);
