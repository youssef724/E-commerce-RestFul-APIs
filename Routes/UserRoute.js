const express = require('express');
const  router = express.Router();
const {getAllUsers} = require("../Controllers/UserControllers")

router.route("/")
            .get(getAllUsers)




module.exports = router;