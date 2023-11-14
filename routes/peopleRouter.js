const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const resourceController = require("../controllers/resourceController");

const validate = [body("name").isString()];
/**
 * @swagger
 * components:
 *  schemas:
 *      Person:
 *          Type: object
 *          required:
 *             - name
 *          properties:
 *            id:
 *              type: string
 *              description: The unique ID of the person
 *            name:
 *              type: string
 *              description: The name of the person.
 *          example:
 *             _id: 6553e07dfa5e8f8b6ba73da5
 *             name: John Doe
 */
/**
 * @swagger
 * tags:
 *  name: Person
 *  description: The People's List
 */

/**
 * @swagger
 * /api:
 *   post:
 *     summary: Create a new person
 *     tags: [Person] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             example:
 *               name: John Doe
 *     responses:
 *       201:
 *         description: Person created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Person'
 *       400:
 *         description: Bad request or validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                         example: Validation error message
 *                       param:
 *                         type: string
 *                         example: name
 *                       location:
 *                         type: string
 *                         example: body
 *               example:
 *                 errors: [{ msg: 'Name is required', param: 'name', location: 'body' }]
 */
router.post("/", validate, resourceController.createPerson);

/**
 * @swagger
 * /api/{user_id}:
 *   get:
 *     summary: Get details of a person by user ID
 *     tags: [Person]  
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         description: ID of the person to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Person details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Person'
 *       404:
 *         description: Person not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Person not found.
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to fetch person details.
 */
router.get("/:user_id", resourceController.getPerson);

/**
 * @swagger
 * /api/{user_id}:
 *   put:
 *     summary: Update a person's name by user ID
 *     tags: [Person]  
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         description: ID of the person to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             example:
 *               name: John Doe
 *     responses:
 *       200:
 *         description: Person updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Person'
 *       400:
 *         description: Bad request or validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                         example: Validation error message
 *                       param:
 *                         type: string
 *                         example: name
 *                       location:
 *                         type: string
 *                         example: body
 *               example:
 *                 errors: [{ msg: 'Name is required', param: 'name', location: 'body' }]
 *       404:
 *         description: Person not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Person not found.
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to update person details.
 */
router.put("/:user_id", validate, resourceController.updatePerson);

/**
 * @swagger
 * /api/{user_id}:
 *   delete:
 *     summary: Delete a person by user ID
 *     tags: [Person]  
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         description: ID of the person to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Person deleted successfully
 *       400:
 *         description: Bad request or validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid user_id format.
 *       404:
 *         description: Person not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Person not found, pass the correct user_id
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to delete person details.
 */
router.delete("/:user_id", resourceController.deletePerson);

module.exports = router;
