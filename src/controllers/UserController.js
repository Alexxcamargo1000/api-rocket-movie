const { hash, compare } = require("bcryptjs");
const knex = require("../database/knex");
const AppError = require("../utils/AppError");
class UserController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const lowEmail = email.toLowerCase();

    const checkEmail = await knex("users")
      .select("email")
      .from("users")
      .where("email", lowEmail);

    if (checkEmail.length > 0) {
      throw new AppError("Esse email já esta em uso");
    }

    const hashedPassword = await hash(password, 8);

    await knex("users").insert({
      name,
      email: lowEmail,
      password: hashedPassword,
    });

    return response.json();
  }

  async delete(request, response) {
    const { id } = request.params;

    const [checkUserExists] = await knex("users")
      .select()
      .from("users")
      .where("id", id);

    if (!checkUserExists) {
      throw new AppError("Usuário não existe");
    }

    await knex("users").where("id", id).delete();
    return response.json({
      message: `deletado usuário ${checkUserExists.name} com o id: ${id}`,
    });
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const { id } = request.params;

    const [user] = await knex("users").select().from("users").where("id", id);
    const [checkEmail] = await knex("users")
      .select()
      .from("users")
      .where("email", email);

    if (!user) {
      throw new AppError("Usuário não existe");
    }

    if (checkEmail && checkEmail.id !== user.id) {
      throw new AppError("Email já esta em uso");
    }

    if (password && !old_password) {
      throw new AppError("Precisa digitar a senha nova para mudar");
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError("A senha não confere");
      }

      user.password = await hash(password, 8);
    }

    await knex("users").where("id", id).update({
      name,
      email,
      password: user.password,
      updated_at: knex.fn.now(),
    });

    return response.json({
      message: `usuário com o id: ${id} foi atualizado`,
    });
  }
}

module.exports = UserController;
