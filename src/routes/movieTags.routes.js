const { Router } = require("express");

const TagsController = require("../controllers/TagsController");

const tagsController = new TagsController();
const movieTagsRoutes = Router();

movieTagsRoutes.get("/:user_id", tagsController.index);

module.exports = movieTagsRoutes;
