const Registration = require('../modles/Registration');
const Event = require('../modles/Event');

const registerToEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    if (event.capacity > 0) {
      const count = await Registration.countDocuments({ event: event._id, status: 'registered' });
      if (count >= event.capacity) return res.status(400).json({ message: 'Event is full' });
    }

    const reg = await Registration.create({ user: req.user._id, event: event._id });
    res.status(201).json(reg);
  } catch (err) {
    if (err.code === 11000)
      return res.status(400).json({ message: 'Already registered' });
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getUserRegistrations = async (req, res) => {
  const regs = await Registration.find({ user: req.user._id }).populate('event');
  res.json(regs);
};

const cancelRegistration = async (req, res) => {
  const reg = await Registration.findById(req.params.id);
  if (!reg) return res.status(404).json({ message: 'Registration not found' });
  reg.status = 'cancelled';
  await reg.save();
  res.json({ message: 'Registration cancelled', reg });
};

module.exports = { registerToEvent, getUserRegistrations, cancelRegistration };
