const express = require("express");
const router = express.Router();

// import controller
const Student = require("../controller/student");

router.post("/add", Student.add);
router.post("/login", Student.login);
router.post("/userById", Student.userById);
router.post("/allUsers", Student.allUsers);
router.post("/update", Student.update);
router.post("/remove", Student.remove);

module.exports = router;
