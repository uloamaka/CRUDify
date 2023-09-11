const express = require("express");
const { body } = require("express-validator"); 
const router = express.Router();

const resourceController = require("../controllers/resourceController");

 const validate = [body("name").isString()];

router.post("/", validate, resourceController.createPerson);
router.get("/:user_id", resourceController.getPerson);
router.put("/:user_id", validate, resourceController.updatePerson);
router.delete("/:user_id", resourceController.deletePerson);

module.exports = router;
