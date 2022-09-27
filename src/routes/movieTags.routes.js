const { Router } = require("express");

const TagsController = require("../controllers/TagsController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const tagsController = new TagsController();
const movieTagsRoutes = Router();

movieTagsRoutes.get("/", ensureAuthenticated, tagsController.index);

module.exports = movieTagsRoutes;
