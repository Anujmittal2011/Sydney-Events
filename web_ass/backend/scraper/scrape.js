const axios = require('axios');
const cheerio = require('cheerio');
const Event = require('../models/Event');

const scrapeEvents = async () => {
    const url = 'https://www.eventbrite.com.au/d/australia--sydney/events/';

    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const events = [];

        $('.search-event-card-wrapper').each((i, el) => {
            const title = $(el).find('.eds-event-card__formatted-name--is-clamped').text().trim();
            const date = $(el).find('.eds-text-bs--fixed').first().text().trim();
            const link = $(el).find('a').attr('href');
            const location = "Sydney";
            const description = "See link for more info";

            if (title && link) {
                events.push({ title, date, link, location, description });
            }
        });

        // Save to DB
        await Event.deleteMany({});
        await Event.insertMany(events);

        console.log('Scraped and saved events.');
    } catch (err) {
        console.error('Scraping failed', err);
    }
};

module.exports = scrapeEvents;
