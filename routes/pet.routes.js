const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Pet = require('../models/Pet.model');
const fileUploader = require('../config/cloudinary.config');
const User = require("../models/User.model");

// Create a new pet
router.post('/', fileUploader.single("petImage"), async (req, res) => {
  const { petName, petAge, petAbout } = req.body;

  // Perform validation here
  if(!petName || !petAge || !petAbout) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  const userId = req.authUser._id;
  const petPayload = new Pet({ petName, petAge, petAbout});

  try {
    if(req.file) {
      petPayload["petImage"] = req.file.path;
      console.log("Image found: ", req.file.path);
    }

    const createdPet = await petPayload.save(petPayload)
    console.log("Pet created: ", createdPet);
    // Remove existing pets and add the new pet to the user
    User.findByIdAndUpdate(userId, { $set: { usersPetId: createdPet._id }})
    .then((user) => {
      console.log("User updated: ", user);
    })
    .catch((error) => {
      console.log("Failed to update user: ", error);
    });

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
router.patch('/:id', fileUploader.single("petImage"), async (req, res) => {
  const { petName, petAge, petAbout } = req.body;
  const petPayload = { petName, petAge, petAbout };

  // Perform validation here
  if(!petName || !petAge || !petAbout) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if(req.file) {
    petPayload["petImage"] = req.file.path;
    console.log("Image found: ", req.file.path);
  }
  
  try {
    const updatedPet = await Pet.findByIdAndUpdate(req.params.id, petPayload, { new: true })
    if (!updatedPet) {
      throw new Error('Pet not found');
    }

    return res.status(200).json(updatedPet);
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: 'Pet not found' });
  }
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
