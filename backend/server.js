const express = require("express");
const multer = require("multer");
const cors = require("cors");
const mongoose = require("mongoose");
const Image = require("./models");
const fs = require("fs");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb://127.0.0.1:27017/file-uploader",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) console.log(err);
    console.log("Connected to database");
  }
);

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage }).single("file");

const saveImage = async (image, req) => {
  await image.save();

  console.log(`${req.file.filename} added to database`);
  const fetchedImage = await Image.findOne({ name: req.file.filename });
  return fetchedImage;
};

app.post("/v1/file/", (req, res) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }

    let fileData = fs.readFileSync(req.file.path);

    const image = new Image({
      name: req.file.originalname,
      type: req.file.mimetype,
      data: fileData,
    });

    await image.save();
    console.log(`${req.file.originalname} added to database`);

    const fetchedImage = await Image.findOne({ name: req.file.originalname });
    return res.status(200).send(fetchedImage);
  });
});

app.listen(8080, (err) => {
  if (err) console.log(err);

  console.log("Server is running");
});
