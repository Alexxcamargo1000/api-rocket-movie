const { Router } = require('express')

const userRoutes = Router()

userRoutes.post('/', (request, response) => {
  const { name, email } = request.body
  response.json({ name, email})
})

module.exports = userRoutes