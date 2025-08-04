const Ticket = require("../models/ticket")

const User = require("../models/user")


const createTicket = async (req, res) => {
  try {
    const ticket = await Ticket.create({...req.body})

    await User.findByIdAndUpdate(ticket.ownerId, {
      $push: { tickets: ticket._id }
    })
    res.status(200).send(ticket)
  } catch (error) {
    throw error
  }
}

const updateTicket = async (req, res) => {
  try {
    
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    res.status(200).send(ticket)
  } catch (error) {
    throw error
  }
}

const deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id)
    res.status(200).send(ticket)
  } catch (error) {
    throw error
  }
}

module.exports = {
  createTicket,
  updateTicket,
  deleteTicket
}