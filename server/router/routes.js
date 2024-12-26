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
        const shortUrl = `${urlCode}`
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

    const url = await Url.findOne({ shortUrl: shortUrlCode });

    if (url) {
        url.clicks++;
        await url.save();
        return res.redirect(url.originalUrl);
    } else {
        return res.status(404).json('URL not found');
    }
});
router.put('/:shortUrl', async (req, res) => {
    try {
        const { shortUrl } = req.params;
        const { originalUrl } = req.body;

        const updatedUrl = await Url.findOneAndUpdate(
            { shortUrl },
            { originalUrl },
            { new: true }
        );

        if (!updatedUrl) {
            return res.status(404).json({ error: 'URL not found' });
        }

        res.json(updatedUrl);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.delete('/:shortUrl', async (req, res) => {
    try {
        const { shortUrl } = req.params;

        const deletedUrl = await Url.findOneAndDelete({ shortUrl });

        if (!deletedUrl) {
            return res.status(404).json({ error: 'URL not found' });
        }

        res.json({ message: 'URL deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});


module.exports = router;