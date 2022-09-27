const { Router } = require("express");

const UserController = require("../controllers/UserController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated")
const userController = new UserController();
const userRoutes = Router();

userRoutes.post("/", userController.create);
userRoutes.delete("/", ensureAuthenticated, userController.delete);
userRoutes.put("/", ensureAuthenticated, userController.update);

module.exports = userRoutes;
