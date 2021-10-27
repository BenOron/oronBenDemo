const express = require('express');
const router = express.Router();
const Widget = require('../models/widget')
const dataResponse = require( '../json/widgets.json');



// Routes
router.get('/widgets', (req, res) => {
    Widget.find({  })
    .then((data) => {

        res.json(data);
    })
    .catch((error) => {
        console.log('error: ', error);
    });
});




router.post('/save', (req, res) => {
    const data = req.body;
    const widgets = new Widget(data);
    Widget.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'Sorry, internal server errors' });
            return;
        }
        // Widgt
        return res.json({
            msg: 'Your data has been saved!!!!!!'
        });
    });
});




module.exports = router;