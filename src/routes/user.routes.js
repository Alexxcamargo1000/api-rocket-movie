const { Router } = require("express");
const multer = require("multer");
const uploadConfigs  = require("../configs/uploads");

const UserController = require("../controllers/UserController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const userController = new UserController();
const userRoutes = Router();

const uploadFile = multer(uploadConfigs.MULTER);

userRoutes.post("/", userController.create);
userRoutes.delete("/", ensureAuthenticated, userController.delete);
userRoutes.put("/", ensureAuthenticated, userController.update);
userRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  uploadFile.single("avatar"),
  userController.uploadAvatar
);

module.exports = userRoutes;
