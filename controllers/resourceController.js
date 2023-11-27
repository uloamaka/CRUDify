const Person = require("../model/peopleModel");
const { validationResult } = require("express-validator");
const { ObjectId } = require("mongodb");
const { z } = require("zod");
const { ResourceNotFound, BadRequest } = require("../errors/httpErrors");
const {
  RESOURCE_NOT_FOUND,
  INVALID_REQUEST_PARAMETERS,
} = require("../errors/httpErrorCodes");

const createPerson = async (req, res) => {
  const createPersonSchema = z.object({
    name: z
      .string()
      .min(1)
      .max(50)
      .refine(
        (name) => {
          const forbiddenChars = [
            "*",
            "?",
            "+",
            "<",
            ">",
            "!",
            ",",
            ".",
            "[",
            "]",
            ";",
            "=",
            "|",
            "&",
            "#",
            "(",
            ")",
            "'",
            "\n",
            "\r",
            "\t",
            "\b",
            "\f",
            "\v",
          ];
          return !forbiddenChars.some((char) => name.includes(char));
        },
        {
          message: "Forbidden characters are not allowed in the name field",
        }
      ),
  });

  const validationResult = createPersonSchema.safeParse(req.body);

  if (validationResult.error) {
    const fieldErrors = validationResult.error.errors.map((fieldError) => ({
      field: fieldError.path.join("."),
      message: fieldError.message,
    }));
    console.log(fieldErrors[0].message);
    throw new BadRequest(fieldErrors[0].message, INVALID_REQUEST_PARAMETERS);
  }
  const { name } = validationResult.data;
  if (!name) {
    throw new BadRequest("Name is required", INVALID_REQUEST_PARAMETERS);
  }

  const person = new Person({ name });
  const savedPerson = await person.save();
  res.created({
    message: `${savedPerson.name} saved successfully`,
    user_id: `${savedPerson._id}`,
  });
};

const getPerson = async (req, res) => {
  const { user_id } = req.params;
  if (!ObjectId.isValid(user_id)) {
    throw new BadRequest("Invalid user_id format.", INVALID_REQUEST_PARAMETERS);
  }
  const person = await Person.findById(user_id);
  if (!person) {
    throw new ResourceNotFound("Resource not found.", RESOURCE_NOT_FOUND);
  }
  res.ok(person);
};

const updatePerson = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new BadRequest("Invalid request format.", INVALID_REQUEST_PARAMETERS);
  }
  const { user_id } = req.params;
  const { name } = req.body;
  if (!ObjectId.isValid(user_id)) {
    throw new BadRequest("Invalid user_id format.", INVALID_REQUEST_PARAMETERS);
  }
  if (!name) {
    throw new BadRequest("name is required", INVALID_REQUEST_PARAMETERS);
  }
  const person = await Person.findOneAndUpdate(
    { _id: user_id },
    { name },
    {
      new: true,
    }
  );

  if (!person) {
    throw new ResourceNotFound("Resource not found.", RESOURCE_NOT_FOUND);
  }

  res.ok(person);
};

const deletePerson = async (req, res) => {
  const { user_id } = req.params;
  if (!ObjectId.isValid(user_id)) {
    throw new BadRequest("Invalid user_id format.", INVALID_REQUEST_PARAMETERS);
  }
  const person = await Person.findByIdAndRemove(user_id);
  if (!person)
    throw new ResourceNotFound("Resource not found.", RESOURCE_NOT_FOUND);
  res.noContent();
};

module.exports = {
  createPerson,
  getPerson,
  updatePerson,
  deletePerson,
};
