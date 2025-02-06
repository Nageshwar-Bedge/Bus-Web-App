const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    message: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
}, { timestamps: true });

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
