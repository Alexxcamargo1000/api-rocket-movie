const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class MovieNotesController {
  async create(request, response) {
    const { title, description, rating, tags } = request.body;
    const { user_id } = request.params;

    if (rating > 5 || rating < 1) {
      throw new AppError("A nota tem que ser entre 1 e 5");
    }

    const movie_id = await knex("movie_notes").insert({
      title,
      description,
      rating,
      user_id,
    });

    if (tags) {
      const tagsUpperCase = tags.map((tag) => tag.toUpperCase());
      const tagsInsert = tagsUpperCase.map((tag) => {
        return {
          name: tag,
          movie_id,
          user_id,
        };
      });
      await knex("movie_tags").insert(tagsInsert);
    }

    response.json({ message: `movie create` });
  }

  async delete(request, response) {
    const { movie_id } = request.params;
    await knex("movie_notes").where("id", movie_id).delete();

    return response.json({ message: `movie delete` });
  }

  async show(request, response) {
    const { id } = request.params;

    const movie_note = await knex("movie_notes").select().where({ id });

    const tags = await knex("movie_tags").select().where({ movie_id: id });

    response.json({
      ...movie_note,
      tags,
    });
  }

  async index(request, response) {
    const { title, user_id, tags } = request.query;

    let movie_note;

    if (tags) {
      const converteTags = tags
        .split(",")
        .map((tag) => tag.trim().toUpperCase());

      movie_note = await knex("movie_tags")
        .select(["movie_notes.id", "movie_notes.title","movie_notes.description", "movie_notes.user_id"])
        .where("movie_notes.user_id", user_id)
        .whereLike("movie_notes.title", `%${title}%`)
        .whereIn("name", converteTags)
        .innerJoin("movie_notes", "movie_notes.id", "movie_tags.movie_id");
    } else {
      movie_note = await knex("movie_notes")
        .where({ user_id })
        .whereLike("title", `%${title}%`)
        .orderBy("title");
    }


    const userTags = await knex("movie_tags").where({ user_id })
    const movieWhitTag = movie_note.map(movie => {
      const movieTags = userTags.filter( tag => tag.movie_id === movie.id)

      return {
        ...movie_note,
        tags: movieTags
      }
    })
    response.json(movieWhitTag);
  }
}

module.exports = MovieNotesController;
