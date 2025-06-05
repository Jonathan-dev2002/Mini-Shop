const cloudinary = require("cloudinary").v2;
// require('dotenv').config(); // ถ้า .env ไม่ได้ถูกโหลดที่ server.js โดยตรง

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true, // แนะนำให้ใช้ HTTPS
});

const uploadToCloudinary = (fileStream, folder) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        resource_type: "auto", // ให้ Cloudinary ตรวจจับประเภทไฟล์อัตโนมัติ
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);
          return reject(error);
        }
        resolve({ url: result.secure_url, public_id: result.public_id });
      }
    );
    // ถ้า fileStream เป็น stream ให้ pipe ถ้าเป็น path หรือ buffer อาจจะต้องใช้ uploader.upload โดยตรง
    // ตัวอย่างนี้เหมาะกับ stream ที่ได้จาก Hapi
    if (typeof fileStream.pipe === "function") {
      fileStream.pipe(uploadStream);
    } else {
      // สำหรับการอัปโหลดจาก path หรือ buffer โดยตรง (อาจจะต้องปรับ)
      cloudinary.uploader.upload(
        fileStream,
        { folder: folder, resource_type: "auto" },
        (error, result) => {
          if (error) return reject(error);
          resolve({ url: result.secure_url, public_id: result.public_id });
        }
      );
    }
  });
};


const deleteFromCloudinary = (publicId) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) {
        console.error("Cloudinary Delete Error:", error);
        return reject(error);
      }
      resolve(result);
    });
  });
};

module.exports = {
  uploadToCloudinary,
  deleteFromCloudinary,
  cloudinary, // เผื่อต้องการใช้ instance โดยตรง
};