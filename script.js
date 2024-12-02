const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "drg0rwe3j",
});

// generate url based on image's public id
const url = cloudinary.url("cld-sample-5", {
  transformation: [
    { fetch_format: "auto" }, // 'auto' means to generate the image in efficient format for the requested device
    { quality: "auto" }, // compress the image as mush as possible without sacrificing the visual quality
    { width: 1200 }, // resizing
  ],
});

console.log(url);
