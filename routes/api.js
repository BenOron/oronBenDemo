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


router.put('/widgets/update/:id', async function (req, res) {
    const _id = req.params.id  //pass ID user
    Widget.updateOne(_id, {
        $set: {
            "title": req.body.title,
            "brandName": req.body.brandName,
            "country": req.body.country,
            "imgSrcUri": req.body.imgSrcUri,
            "locationWidget": req.body.locationWidget
        }
    }, (err) => {
        if (err) return res.status(200).json({
            error: true,
            code: 115,
            message: "Erro to update user!"
        })
    })
})


// router.put('/update/:id', function (req, res) {
//     Widget.findById(req.params.id, (err, responseByID) => {
//         responseByID.updateOne(req.body, (err) => {
//             if (err) {
//                 res.status(500).send(err);
//             }
//             Widget.find((err) => {
//                 if (err) {
//                     res.status(500).send(err)
//                 }
//
//                 res.json({
//                     success: true,
//                     message: 'Board update successfully'
//                 });
//             });
//         });
//     });
// });




router.post('/save', (req, res) => {
    const data = req.body;
    const widgets = new Widget(data);

    widgets.save((error) => {
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