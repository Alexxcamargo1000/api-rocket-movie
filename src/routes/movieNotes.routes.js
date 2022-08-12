const { Router } = require("express");

const MovieNotesController = require("../controllers/MovieNotesController");

const movieNotesController = new MovieNotesController();
const movieNotesRoutes = Router();

movieNotesRoutes.get("/", movieNotesController.index);
movieNotesRoutes.post("/:user_id", movieNotesController.create);
movieNotesRoutes.get("/:id", movieNotesController.show);
movieNotesRoutes.delete("/:movie_id", movieNotesController.delete);

module.exports = movieNotesRoutes;
