const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const User = require('../models/User.model');
const Pet = require('../models/Pet.model');
const Group = require('../models/Group.model');

// Import your Pet and Group routes
const petRoutes = require('./pet.routes');   // Adjust the path accordingly
const groupRoutes = require('./group.routes'); // Adjust the path accordingly

// Use the Pet routes
router.use('/api/pets', petRoutes); 

// Use the Group routes
router.use('/api/groups', groupRoutes);


module.exports = router;