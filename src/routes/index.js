const { Router } = require("express");
const userRoutes = require("./user.routes");
const movieNotesRoutes = require("./movieNotes.routes");
const movieTagsRoutes = require("./movieTags.routes");

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/movie", movieNotesRoutes);
routes.use("/tags", movieTagsRoutes);

module.exports = routes;
