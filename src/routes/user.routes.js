const { Router } = require("express");
const multer = require("multer");
const uploadConfigs  = require("../configs/uploads");

const UserController = require("../controllers/UserController");
const UserAvatarController = require("../controllers/UserAvatarController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const userController = new UserController();
const userAvatarController = new UserAvatarController();
const userRoutes = Router();

const uploadFile = multer(uploadConfigs.MULTER);

userRoutes.post("/", userController.create);
userRoutes.delete("/", ensureAuthenticated, userController.delete);
userRoutes.put("/", ensureAuthenticated, userController.update);
userRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  uploadFile.single("avatar"),
  userAvatarController.update
);

userRoutes.delete("/avatar", ensureAuthenticated, userAvatarController.delete)

module.exports = userRoutes;
