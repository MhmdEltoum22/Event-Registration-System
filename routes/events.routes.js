const express = require("express");
const Event = require("../modles/Event");
const { authenticate, authorizeRoles } = require("../middlewares/auth.middleware");

const router = express.Router();

// Get all events
router.get("/", async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

// Get event by ID
router.get("/:id", async (req, res) => {
  const event = await Event.findById(req.params.id);
  res.json(event);
});

// Create event (Organizer/Admin only)
router.post("/", authenticate, authorizeRoles("organizer", "admin"), async (req, res) => {
  try {
    const event = new Event({ ...req.body, organizer: req.user.id });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update event (Organizer/Admin only)
router.put("/:id", authenticate, authorizeRoles("organizer", "admin"), async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete event (Admin only)
router.delete("/:id", authenticate, authorizeRoles("admin"), async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
