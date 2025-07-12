const AWS = require("aws-sdk");
const { Chat } = require("../models");

function uploadToS3(data, fileName) {
  let s3bucket = new AWS.S3({
    accessKeyId: process.env.IAM_USER_KEY,
    secretAccessKey: process.env.IAM_USER_SECRET,
  });

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: fileName,
    Body: data,
    ACL: "public-read",
  };

  return new Promise((resolve, reject) => {
    s3bucket.upload(params, (err, s3response) => {
      if (err) {
        console.log("Error uploading to S3", err);
        reject(err);
      } else {
        console.log("Upload Success", s3response);
        resolve(s3response.Location);
      }
    });
  });
}

const addFile = async (req, res) => {
  const user = req.user;

  const groupId = req.params.id;

  console.log("111111111111111111111111111111111111111", user);

  const file = req.file;

  try {
    if (!file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    const s3Url = await uploadToS3(
      file.buffer,
      file.originalname,
      file.mimetype
    );

    const msg = await Chat.create({
      msg: s3Url,
      NewGroupId: groupId,
      UserId: user.id,
    });

    res.status(201).json({
      fileMsg: "File uploaded to S3",
      fileUrl: s3Url,
      msg: msg,
    });
  } catch (error) {
    console.error("S3 upload error:", error);
    res.status(500).json({
      msg: "File upload failed",
      error: error.message,
    });
  }
};

module.exports = addFile;
