class UserController {

  create(request, response) {
    const {name, email, password} = request.body
    console.log(`create`);
    response.status(200).send({name, email, password})
  }
}

module.exports = UserController;