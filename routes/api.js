const express = require('express');
const router = express.Router();
const Widget = require('../models/widget')


router.get('/widgets', (req, res) => {
    Widget.find({  })
    .then((data) => {

        res.json(data);
    })
    .catch((error) => {
        console.log('error: ', error);
    });
});



router.delete('/widgets/delete/:id', (req, res) => {
      Widget.findByIdAndDelete(req.params.id).then((widgets) => {
        if (!widgets) {
            return res.status(404).send();
        }
        res.send(widgets);
    }).catch((error) => {
        res.status(500).send(error);
    })
})

router.get('/widgets/widget/update_location/:locationWidget', (req, res) => {
    Widget.findByIdAndUpdate( req.params.locationWidget , {locationWidget: -1}, function (err, widget) {
        res.json(widget);
    })
});


router.get('/widgets/widget/:locationWidget', (req, res) => {
    Widget.find({locationWidget: req.params.locationWidget}, function (err, widget) {
        res.json(widget);
    })
});


router.patch('/widgets/update/:id', (req, res) => {
    Widget.findByIdAndUpdate(req.params.id, req.body, {new: true}).then((widgets) => {
        if (!widgets) {
            return res.status(404).send();
        }
        res.send(widgets);
    }).catch((error) => {
        res.status(500).send(error);
    })
})


router.post('/save', (req, res) => {
    const data = req.body;
    const widgets = new Widget(data);
    widgets.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'Sorry, internal server errors' });
            return;
        }
        return res.json({
            msg: 'Your data has been saved!!!!!!'
        });
    });
});







module.exports = router;