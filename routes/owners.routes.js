const express = require('express');
const router = express.Router();
const User = require("../models/User.model")

// Read all owners by city and paginate them
router.get('/', (req, res) => {
  const { city, page } = req.query;
  if (!city || !page) {
    res.status(400).json({ message: 'Location city and page number are required' });
    return;
  }

  const pageSize = 10;
  const currentPage = page;

  const query = { locationCity: city };
  const options = {
    page: currentPage,
    limit: pageSize,
    sort: { createdAt: -1 },
    select: 'name email locationCity locationState image availabilityToHelp availabilityNeeded'
  };

  User.paginate(query, options)
    .then((owners) => {
      res.status(200).json(owners);
    })
    .catch((error) => {
      res.status(500).json({ message: 'Failed to fetch owners', error: error.message });
    });
});

// Read a single owner by ID
router.get('/:id', async (req, res) => {
  const { with_pets, with_groups } = req.query;
  const ownerId = req.params.id
  let baseQuery = User.findById(ownerId, '-password');

  if (with_pets) {
    baseQuery = baseQuery.populate('usersPetId');
  } 
  if (with_groups) {
    baseQuery = baseQuery.populate('usersGroups');
  }

  const owner = await baseQuery.exec();

  try {
    if (!owner) {
      return res.status(404).json({ message: 'Owner not found' });
    }
  }
  catch (error) {
    res.status(500).json({ message: 'Failed to fetch owner', error: error.message });
  }

  res.status(200).json(owner);
});

// Update an owner by ID
router.put('/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
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
  User.findByIdAndDelete(req.params.id)
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