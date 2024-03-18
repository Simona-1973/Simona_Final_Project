import express from "express";
import { profileImageUpload } from "../middleware/multerCloudinary.js";
import {
  emailConfirmation,
  handleRegister,
} from "../controllers/userController.js";

const userRoutes = express.Router();

userRoutes.post("/register", handleRegister);
userRoutes.post("/emailconfirm/:token", emailConfirmation);

//The following route is an example to test the image upload, it can be deleted
userRoutes.post(
  "/image",
  profileImageUpload.single("profileImage"),

  (req, res) => {
    res
      .status(200)
      .json({ message: "Image uploaded successfully", file: req.file });
  }
);

export default userRoutes;