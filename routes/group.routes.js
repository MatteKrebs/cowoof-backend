const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const User = require('../models/User.model');
const Pet = require('../models/Pet.model');
const Group = require('../models/Group.model');

// //Create new group GET
// router.get("/groups", (req, res, next) => {
//     res.json("All good in here");
//   });
  
// Create a new group
router.post('/groups', (req, res) => {
    Group.create(req.body)
      .then(newGroup => res.status(201).json(newGroup))
      .catch(err => console.log(err));
  });
  
  // Get all groups
  router.get('/groups', (req, res) => {
    Group.find()
      .then(groups => res.status(200).json(groups))
      .catch(err => console.log(err));
  });
  
  // Get a specific group by ID
  router.get('/groups/:id', (req, res) => {
    Group.findById(req.params.id)
      .then(group => {
        if (!group) {
          res.status(404).json({ message: 'Group not found' });
        } else {
          res.status(200).json(group);
        }
      })
      .catch(err => console.log(err));
  });
  
  // Update a group by ID
  router.patch('/groups/:id', (req, res) => {
    Group.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(group => {
        if (!group) {
          res.status(404).json({ message: 'Group not found' });
        } else {
          res.status(200).json(group);
        }
      })
      .catch(err => console.log(err));
  });
  
  // Delete a group by ID
  router.delete('/groups/:id', (req, res) => {
    Group.findByIdAndDelete(req.params.id)
      .then(group => {
        if (!group) {
          res.status(404).json({ message: 'Group not found' });
        } else {
          res.status(204).send();
        }
      })
      .catch(err => console.log(err));
  });

module.exports = router;