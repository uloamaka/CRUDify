const Person = require("../model/peopleModel");
const { validationResult } = require("express-validator");

const createPerson = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name } = req.body;

  try {
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }
    // Create a new Person object with the name field
    const person = new Person({ name });
    const savedPerson = await person.save();
    res.json(savedPerson);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPerson = async (req, res) => {
  try {
    const { user_id } = req.params;
    const person = await Person.findById(user_id);
    if (!person) {
      return res.status(404).json({ error: "Person not found." });
    }
    res.json(person);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch person details." });
  }
};

const updatePerson = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { user_id } = req.params;
  const { name } = req.body;
  try {
    const person = await Person.findOneAndUpdate(
      { _id: user_id },
      { name },
      {
        new: true,
      }
    );

    if (!person) {
      return res.status(404).json({ error: "Person not found" });
    }

    res.json(person);
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
};

const deletePerson = async (req, res) => {
  const { user_id } = req.params;
  try {
    const person = await Person.findByIdAndRemove(user_id);
    if (!person) throw new Error("Person not found, pass the correct user_id");
    res.json({ message: "Person removed" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  createPerson,
  getPerson,
  updatePerson,
  deletePerson,
};
