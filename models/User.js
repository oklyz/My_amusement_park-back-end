const mongoose  = require("mongoose")

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String, require: true
    },
    lastName: {
      type: String, require: true
    },
    email: {
      type: String, require: true
    },
    passwordDigest: {
      type: String, require: true
    },
    avatar: {
      type: String, default: "images/profile-picture.png"
    },
    tickets : [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket"
      }
    ]
  },
  {
    timestamps: true
  }
)

const User = mongoose.model("User", userSchema)

module.exports = User