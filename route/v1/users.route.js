const express = require("express");
const userController = require("../../controller/users.controller");

//  create a router:
const router = express.Router();

router.get("/", userController.getUsers);
router.post("/", userController.saveUsers);
router.patch("/:id", userController.specificUpdate);
router.delete("/:id", userController.deleteUser);
router.get("/random", userController.getRandomUser);

module.exports = router;
