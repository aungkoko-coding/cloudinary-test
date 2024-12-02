require("dotenv").config();

const express = require("express");
const path = require("node:path");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: "drg0rwe3j",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer with Cloudinary Storage
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "uploads",
//     format: async () => "png", // Or 'jpeg', etc.
//   },
// });
// const upload = multer({ storage });

function uploadMiddleware(folderName) {
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) => {
      const folderPath = `${folderName.trim()}`; // Update the folder path here
      const fileExtension = path.extname(file.originalname).substring(1);
      const publicId = `${file.fieldname}-${Date.now()}`;

      console.log({
        folderPath,
        fileExtension,
        publicId,
      });

      return {
        folder: folderPath,
        public_id: publicId,
        format: fileExtension,
      };
    },
  });

  return multer({
    storage: storage,
    limits: {
      fileSize: 5 * 1024 * 1024, // keep images size < 5 MB
    },
  });
}

const upload = uploadMiddleware("uploads");

const app = express();

app.post("/upload", upload.single("image"), (req, res) => {
  res.json({ url: req.file.path });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
