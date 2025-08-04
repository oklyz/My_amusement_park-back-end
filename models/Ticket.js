const mongoose = require("mongoose")

const ticketSchema = new mongoose.Schema(
  {
    type: {
      type: String, 
      enum: ["Normal", "VIP"]
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    date: {
      type: Date,
      required: true,
    },
    pirce: {
      type: Number,
      required: true
    },
  },
  {
    timestamps: true
  }
)

const Ticket = mongoose.model("Ticket", ticketSchema)

module.exports = Ticket