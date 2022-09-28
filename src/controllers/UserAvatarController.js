const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class UserAvatarController {

  async update(request, response) {
    const user_id = request.user.id
    const avatarFilename = request.file.filename

    const diskStorage = new DiskStorage()

    const user = await knex("users").where({ id: user_id }).first()

    if(!user) {
      throw new AppError("apenas usuários autenticado podem mudar a foto", 401)
    }

    if(user.avatar) {
      await diskStorage.delete(user.avatar)
    }
    console.log(avatarFilename)
    const filename = await diskStorage.save(avatarFilename)

    user.avatar = filename;

    await knex("users").where({ id: user.id}).update(user)

    return response.json(user)

  }

  async delete(request, response) {
    const user_id = request.user.id
    const user = await knex("users").where({ id: user_id}).first()
    const diskStorage = new DiskStorage()

    console.log(user);
    if(!user.avatar) {
      throw new AppError("Avatar não existe!")

    }

    await diskStorage.delete(user.avatar)

    user.avatar = null
    await knex("users").where({ id: user.id}).update(user)

    return response.json(user)
  }

}

module.exports =  UserAvatarController