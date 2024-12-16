const express = require('express');
const router = express.Router();
const Url = require('../model/url');
const shortid = require('shortid');

router.get('/getall', async (req, res) => {
    const url = await Url.find();
    res.status(200).json(url);

})

router.post('/shorten', async (req, res) => {
    try {
        const { originalUrl } = req.body;

        const urlCode = shortid.generate();
        const shortUrl = `${process.env.BASE_URL}/${urlCode}`
        const url = new Url({
            originalUrl,
            shortUrl,
            urlCode
        });
        await url.save();
        res.status(200).json(url);
    } catch (error) {
        console.error(err);
        res.status(500).json({ error: '500 server error' });
    }

});

router.get('/:shortUrlCode', async (req, res) => {
    const shortUrlCode = req.params.shortUrlCode;

    const url = await Url.findOne({ urlCode: shortUrlCode });

    if (url) {
        url.clicks++;
        await url.save();
        return res.redirect(url.originalUrl);
    } else {
        return res.status(404).json('URL not found');
    }
});

module.exports = router;