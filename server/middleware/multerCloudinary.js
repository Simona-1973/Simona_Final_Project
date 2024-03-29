import cloudinaryV2 from "../config/cloudinary.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

//Profile image upload
/* An updated version of the function for the 
profile image upload with same functionality 
but slightly better error handling */
const profileImageStorage = new CloudinaryStorage({
  cloudinary: cloudinaryV2,
  params: {
    folder: "Simona_Final_Project/profile_images",
    format: async (req, file) => {
      try {
        if (file.mimetype.includes("image")) {
          const extension = file.mimetype.split("/")[1];
          return extension;
        } else {
          throw new Error(
            "The file has to be one of the following formats: .jpg, .jpeg, .png, .gif, .bmp, .webp, .svg, .svgz"
          );
        }
      } catch (error) {
        console.error("Error uploading the image", error);
      }
    },
    public_id: (req, file) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      return uniqueSuffix;
    },
  },
});

const profileImageUpload = multer({ storage: profileImageStorage });

export { profileImageUpload };
