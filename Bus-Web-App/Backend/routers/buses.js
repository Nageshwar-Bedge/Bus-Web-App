const express = require('express');
const Bus = require('../models/bus');
const router = express.Router();

// Route to fetch buses based on search criteria or show upcoming buses
router.get('/', async (req, res) => {
    try {
        const { source, destination, date } = req.query;
        
        // If search parameters are provided, filter based on them
        if (source && destination && date) {
            console.log("Searching buses with:", source, destination, date);
            
            const query = { source, destination, date };
            const buses = await Bus.find(query);

            if (buses.length > 0) {
                return res.json({ buses });
            } else {
                return res.json({ message: "No buses found for the selected route and date." });
            }
        } 

        // If no search parameters are provided, show upcoming buses
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const upcomingBuses = await Bus.find({
            date: { $gte: today.toISOString().split('T')[0] }
        }).sort({ date: 1 });

        if (upcomingBuses.length > 0) {
            return res.json({ buses: upcomingBuses });
        } else {
            return res.json({ message: "No upcoming buses available." });
        }
        
    } catch (error) {
        res.status(500).send("Error fetching buses: " + error.message);
    }
});

module.exports = router;
