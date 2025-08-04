const router = require("express").Router()
const controller = require("../controllers/ticket")
const middleware = require("../middlewares/index")

router.post(
  "/new",
  middleware.stripToken,
  middleware.verifyToken,
  controller.createTicket
)

module.exports = router
