const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const User = require('../models/User.model');
const Pet = require('../models/Pet.model');
const Group = require('../models/Group.model');


// Create a new pet
router.post('/pets', (req, res) => {
    Pet.create(req.body)
      .then(newPet => res.status(201).json(newPet))
      .catch(err => console.log(err));
  });
  
  // Get all pets
  router.get('/pets', (req, res) => {
    Pet.find()
      .then(pets => res.status(200).json(pets))
      .catch(err => console.log(err));
  });
  
  // Get a specific pet by ID
  router.get('/pets/:id', (req, res) => {
    Pet.findById(req.params.id)
      .then(pet => {
        if (!pet) {
          res.status(404).json({ message: 'Pet not found' });
        } else {
          res.status(200).json(pet);
        }
      })
      .catch(err => console.log(err));
  });
  
  // Update a pet by ID
  router.patch('/pets/:id', (req, res) => {
    Pet.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(pet => {
        if (!pet) {
          res.status(404).json({ message: 'Pet not found' });
        } else {
          res.status(200).json(pet);
        }
      })
      .catch(err => console.log(err));
  });
  
  // Delete a pet by ID
  router.delete('/pets/:id', (req, res) => {
    Pet.findByIdAndDelete(req.params.id)
      .then(pet => {
        if (!pet) {
          res.status(404).json({ message: 'Pet not found' });
        } else {
          res.status(204).send();
        }
      })
      .catch(err => console.log(err));
  });

module.exports = router;
