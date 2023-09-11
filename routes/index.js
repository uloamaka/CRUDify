const router = require("express").Router();

const peopleRouter = require("./peopleRouter");

router.use("/api", peopleRouter);

module.exports = router;
