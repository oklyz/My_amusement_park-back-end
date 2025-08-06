const router = require("express").Router()
const controller = require("../controllers/auth")
const middleware = require("../middlewares")

router.post("/login", controller.Login)
router.post("/register", controller.Register)
router.put(
  "/update/:user_id",
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdatePassword
)

router.delete("/user/:user_id", 
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeleteUser)

router.get(
  "/session",
  middleware.stripToken,
  middleware.verifyToken,
  controller.CheckSession
)


module.exports = router