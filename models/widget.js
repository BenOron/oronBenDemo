const mongoose = require('mongoose'); 


//Scheme 
const Schema = mongoose.Schema;
const WidgetSchema = new Schema({
    country:String,
    brandName:String,
    title:String,
    imgSrcUri:String,
    locationWidget:{type:Number,default:-1},
    date: { type: Date, default: Date.now }
});



//Model 
const Widget = mongoose.model('Widget',WidgetSchema);

module.exports = Widget;