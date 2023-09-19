const express = require('express');
const router = express.Router();
const User = require("../models/User.model")


// Read all owners
router.get('/owners', (req, res) => {
  Owner.find()
    .then((owners) => {
      res.status(200).json(owners);
    })
    .catch((error) => {
      res.status(500).json({ message: 'Failed to fetch owners', error: error.message });
    });
});

// Read a single owner by ID
router.get('owners/:id', (req, res) => {
  Owner.findById(req.params.id)
    .then((owner) => {
      if (!owner) {
        res.status(404).json({ message: 'Owner not found' });
        return;
      }
      res.status(200).json(owner);
    })
    .catch((error) => {
      res.status(500).json({ message: 'Failed to fetch owner', error: error.message });
    });
});

// Update an owner by ID
router.put('/:id', (req, res) => {
  Owner.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedOwner) => {
      if (!updatedOwner) {
        res.status(404).json({ message: 'Owner not found' });
        return;
      }
      res.status(200).json(updatedOwner);
    })
    .catch((error) => {
      res.status(500).json({ message: 'Failed to update owner', error: error.message });
    });
});

// Delete an owner by ID
router.delete('/:id', (req, res) => {
  Owner.findByIdAndDelete(req.params.id)
    .then((deletedOwner) => {
      if (!deletedOwner) {
        res.status(404).json({ message: 'Owner not found' });
        return;
      }
      res.status(204).end();
    })
    .catch((error) => {
      res.status(500).json({ message: 'Failed to delete owner', error: error.message });
    });
});

module.exports = router;