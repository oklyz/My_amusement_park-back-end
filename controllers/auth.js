const User = require("../models/user")
const middleware = require("../middlewares")

const Register = async (req, res) => {
  try {

    const {email, password, confirmPassword, firstName, lastName} = req.body


    if (password !== confirmPassword) {
      return res.status(400).send("Password must match")
    }

    let passwordDigest = await middleware.hashPassword(password)


    let existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).send("A user with that email has already been registered!")
    } else {
      const user = await User.create({ firstName, lastName, email, passwordDigest })

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
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        avatar: user.avatar,
        id: user._id,
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

const UpdatePassword = async (req, res) => {
  try {

    const { oldPassword, newPassword } = req.body

    let user = await User.findById(req.params.user_id)

    let matched = await middleware.comparePassword(
      oldPassword,
      user.passwordDigest
    )

    if (matched) {
      let passwordDigest = await middleware.hashPassword(newPassword)
      user = await User.findByIdAndUpdate(req.params.user_id, {
        passwordDigest
      })

      let payload = {
        id: user.id,
        email: user.email
      }
      return res.status(200).send({ status: "Password Updated!", user: payload })
    }
    res.status(401).send({ status: 'Error', msg: 'Old Password did not match!' })
  } catch(error) {
    console.log(error)
    res.status(401).send({
      status: 'Error',
      msg: 'An error has occurred updating password!'
    })
  }
}

const DeleteUser = async (req, res) => {

  try {
    await User.findByIdAndDelete(req.params.user_id)

    res.status(200).send({ status: "User Delete!"})
  } catch (error) {
    console.log(error)
    res.status(401).send({
      status: "Error",
      msg: "An error has occurred while deleting user"
    })
  }

}

const CheckSession = async (req, res) => {
  const { payload } = res.locals

  res.status(200).send(payload)
}

module.exports = {
  Register,
  Login,
  UpdatePassword,
  CheckSession,
  DeleteUser
}