const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class TagsController {
  async index(request, response) {
    const  user_id  = request.user.id;

    const tags = await knex("movie_tags").where({ user_id }).groupBy("name");

    response.json(tags);
  }
}

module.exports = TagsController;
