const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const feedDataSchema = new Schema({
    username:{type:String, required:true},
    feedTime:{type:Date,required:true},
    feedLocation:{type:String,required:true},
    foodType:{type:String,required:true},
    foodCategory:{type:String,required:true},
    numberOfDucks:{type:Number,required:true},
    foodQuantity:{type:Number,required:true},
},  {
timestamps:true,
})

const FeedData = mongoose.model('FeedData',feedDataSchema);

module.exports = FeedData;