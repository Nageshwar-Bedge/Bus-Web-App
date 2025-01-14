const express = require('express');
const Bus = require('../models/bus');
const router = express.Router();

// Route to fetch buses based on search criteria
router.get('/', async (req, res) => {
  try {
    const { source, destination, date } = req.query;

    // Log for debugging purposes
    console.log("Searching buses with:", source, destination, date);

    // Convert the date query parameter to a string to ensure a correct comparison
    const query = {
      source: source,
      destination: destination,
      date: date,  // Ensure the date is handled as a string, even if MongoDB stores it differently
    };

    const buses = await Bus.find(query);

    if (buses.length > 0) {
      res.json({ buses });
    } else {
      res.json({ message: "No buses found." });
    }
  } catch (error) {
    res.status(500).send("Error fetching buses: " + error.message);
  }
});

module.exports = router;
