const knex = require("../database/knex");
const AppError = require("../utils/AppError");
class UserController {


  async create(request, response) {
    const { name, email, password } = request.body;

    const checkEmail = await knex("users")
      .select("email")
      .from("users")
      .where("email", email);

    if (checkEmail) {
      throw new AppError("Email already in use");
    }

    await knex("users").insert({
      name,
      email,
      password,
    });

    return response.json();
  }
}

module.exports = UserController;
