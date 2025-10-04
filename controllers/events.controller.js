const Event = require('../modles/Event');

const listEvents = async (req, res) => {
  const events = await Event.find().sort({ startDate: 1 });
  res.json(events);
};

const getEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ message: 'Event not found' });
  res.json(event);
};

const createEvent = async (req, res) => {
  const event = await Event.create({ ...req.body, organizer: req.user._id });
  res.status(201).json(event);
};

const updateEvent = async (req, res) => {
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!event) return res.status(404).json({ message: 'Event not found' });
  res.json(event);
};

const deleteEvent = async (req, res) => {
  const event = await Event.findByIdAndDelete(req.params.id);
  if (!event) return res.status(404).json({ message: 'Event not found' });
  res.json({ message: 'Event deleted' });
};

module.exports = { listEvents, getEvent, createEvent, updateEvent, deleteEvent };
