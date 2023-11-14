const Person = require("../model/peopleModel");
const { validationResult } = require("express-validator");
const { ObjectId } = require("mongodb");

const createPerson = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name } = req.body;

  try {
      if (!name) {
        return res.status(400).json({
          error: {
            msg: "Name is required",
            param: "name",
            location: "body",
          },
        });
    }
    
    const person = new Person({ name });
    const savedPerson = await person.save();
    res.status(201).json({
      message: `${savedPerson.name} saved successfully`,
      user_id: `${savedPerson._id}`,
    });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern.name) {
      res.status(400).json({ error: "Name Already Exists, Try another name." });
  } else {
    res.status(500).json({ error: error.message });
  }
  }
};

const getPerson = async (req, res) => {
  try {
    const { user_id } = req.params;
    if (!ObjectId.isValid(user_id)) {
      return res.status(400).json({ error: "Invalid user_id format." });
    }
    const person = await Person.findById(user_id);
    if (!person) {
      return res.status(404).json({ error: "Person not found." });
    }
    res.status(200).json(person);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: error.message });
  }
};


const updatePerson = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { user_id } = req.params;
  const { name } = req.body;
  if (!ObjectId.isValid(user_id)) {
     return res.status(400).json({ error: "Invalid user_id format." });
  }
  if (!name) {
    return res.status(400).json({error: "name is required"})
  }
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
     if (error.code === 11000 && error.keyPattern.name) {
       res.status(400).json({ error: "Name Already Exists, Try another name." });
     } else {
       res.status(500).json({ error: error.message });
     }
  }
};

const deletePerson = async (req, res) => {
  const { user_id } = req.params;
   if (!ObjectId.isValid(user_id)) {
     return res.status(400).json({ error: "Invalid user_id format." });
   }
  try {
    const person = await Person.findByIdAndRemove(user_id);
    if (!person) throw new Error("Person not found, pass the correct user_id");
    res.status(204).json();;
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPerson,
  getPerson,
  updatePerson,
  deletePerson,
};
