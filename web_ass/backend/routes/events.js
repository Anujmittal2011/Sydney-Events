const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const scrapeEvents = require('../scraper/scrape');

// GET all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find({});
        res.json(events);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Trigger scrape manually (optional route)
router.get('/refresh', async (req, res) => {
    await scrapeEvents();
    res.send("Scraped and updated.");
});

module.exports = router;
