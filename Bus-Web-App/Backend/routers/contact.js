const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");

// POST route to receive contact form data
router.post("/", async (req, res) => {
    try {
        const { message, email, mobile } = req.body;

        if (!message || !email || !mobile) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newContact = new Contact({ message, email, mobile });
        await newContact.save();

        res.status(201).json({ message: "Contact form submitted successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// GET route to fetch all contact messages (for admin)
router.get("/", async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
