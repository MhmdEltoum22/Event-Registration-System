const express = require("express");
const Registration = require("../modles/Registration");
const Event = require("../modles/Event");
const { authenticate } = require("../middlewares/auth.middleware");

const router = express.Router();

// Register for event
router.post("/:eventId", authenticate, async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const registration = new Registration({ user: req.user.id, event: event._id });
    await registration.save();

    res.status(201).json(registration);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// View my registrations
router.get("/", authenticate, async (req, res) => {
  const registrations = await Registration.find({ user: req.user.id }).populate("event");
  res.json(registrations);
});

// Cancel registration
router.delete("/:id", authenticate, async (req, res) => {
  try {
    await Registration.findByIdAndDelete(req.params.id);
    res.json({ message: "Registration cancelled" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
