const User = require("../models/User")
const middleware = require("../middlewares")

const Register = async (req, res) => {
  try {
    
    const {email, password, name} = req.body

    let passwordDigest = await middleware.hashPassword(password)

    let existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).send("A user with that email has already been registered!")
    } else {
      const user = await User.create({ name, email, passwordDigest })

      res.status(200).send(user)
    }
  } catch (error) {
    throw error
  }
}

const Login = async (req, res) => {
  try {

    const { email, password } = req.body

    const user = await User.findOne({ email })

    let matched = await middleware.comparePassword(password,
      user.passwordDigest
    )

    if (matched) {
      let payload = {
        id: user._id,
        email: user.email
      }

      let token = middleware.createToken(payload)
      return res.status(200).send({ user: payload, token })
    }
    res.status(401).send({ status: "Error", msg: "Unauthorized" })
  } catch (error) {
    console.log(error)
    res.status(401).send({ status: 'Error', msg: 'An error has occurred logging in!' })
  }
}