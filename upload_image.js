require("dotenv").config();
const cloudinary = require("cloudinary").v2;

// Now we need api key and api secret to upload images on cloudinary
cloudinary.config({
  cloud_name: "drg0rwe3j",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

(async () => {
  const results = await cloudinary.uploader.upload("./images/2.jpg");
  console.log(results);
  //   {
  //     asset_id: 'd168a55070280ecb9cdd9e18747e12e4',
  //     public_id: 'ovf26cc83f3xjpadjyn4',
  //     version: 1733152274,
  //     version_id: 'cf4b8586198abbe449b56f2cd61ff739',
  //     signature: '00db996b4fea7d4633d69775983d2ef83f45dd76',
  //     width: 1000,
  //     height: 667,
  //     format: 'jpg',
  //     resource_type: 'image',
  //     created_at: '2024-12-02T15:11:14Z',
  //     tags: [],
  //     bytes: 441008,
  //     type: 'upload',
  //     etag: 'f92c3405c534bd100b6f8f89dab38899',
  //     placeholder: false,
  //     url: 'http://res.cloudinary.com/drg0rwe3j/image/upload/v1733152274/ovf26cc83f3xjpadjyn4.jpg',
  //     secure_url: 'https://res.cloudinary.com/drg0rwe3j/image/upload/v1733152274/ovf26cc83f3xjpadjyn4.jpg',
  //     asset_folder: '',
  //     display_name: 'ovf26cc83f3xjpadjyn4',
  //     original_filename: '2',
  //     api_key: 'your_api_key'
  //   }

  const url = cloudinary.url(results.public_id, {
    transformation: [
      { fetch_format: "auto", quality: "auto" },
      {
        width: 1200,
        height: 1200,
        crop: "fill", // crop without skewing the image
        gravity: "auto", // crop the image by focusing on the object
      },
    ],
  });

  console.log(url);

  // Crop using width and height
  // https://res.cloudinary.com/drg0rwe3j/image/upload/f_auto,q_auto/h_1200,w_1200/q0t6swyozya4hrwpwufi?_a=BAMCkGTE0

  // After combing with crop: 'fill'
  // https://res.cloudinary.com/drg0rwe3j/image/upload/f_auto,q_auto/c_fill,h_1200,w_1200/dbjbxho0osefjnzetwcu?_a=BAMCkGTE0

  // After combining with crop: 'fill' and gravity: 'auto'
  // https://res.cloudinary.com/drg0rwe3j/image/upload/f_auto,q_auto/c_fill,g_auto,h_1200,w_1200/guowl2xtc3k396mrw8ub?_a=BAMCkGTE0
})();
