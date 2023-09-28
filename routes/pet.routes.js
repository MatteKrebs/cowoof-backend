const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Pet = require('../models/Pet.model');
const fileUploader = require('../config/cloudinary.config');

// Create a new pet
router.post('/', fileUploader.single("petImage"), async (req, res) => {
  const { petName, petAge, petAbout, ownerId } = req.body;

  console.log(req.body);
  console.log(req.petImage);


  try {
    const createdPet = await Pet.create({ petName, petAge, petAbout, petImage: req.file.path, ownerId })
    const owner = req.authUser;
    console.log(owner);
    return res.status(201).json(createdPet);
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to create pet', error: error.message });
  }
});

// Get all pets
router.get('/', (req, res) => {
  Pet.find()
    .then(pets => res.status(200).json(pets))
    .catch(err => console.log(err));
});

// Get a specific pet by ID
router.get('/:id', (req, res) => {
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
router.patch('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
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
