const express = require('express');
const router = express.Router();
const Url = require('../model/url');
const shortid = require('shortid');

router.post('/shorten', async (req, res) => {
    const { longUrl } = req.body;

    const urlCode = shortid.generate();
    const shortUrl = `<span class="math-inline">\{process.env.BASE_URL}/${urlCode}\</span>`;
    const url = new Url({
        longUrl,
        shortUrl,
        urlCode
    });

    await url.save();
    res.json(url);
});

router.get('/:shortUrlCode', async (req, res) => {
    const shortUrlCode = req.params.shortUrlCode;

    const url = await Url.findOne({ urlCode: shortUrlCode });

    if (url) {
        url.clicks++;
        await url.save();
        return res.redirect(url.longUrl);
    } else {
        return res.status(404).json('URL not found');
    }
});

module.exports = router;