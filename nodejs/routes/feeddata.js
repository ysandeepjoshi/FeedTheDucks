const router = require("express").Router();

let FeedInfo = require("../models/feeddata.model");

router.route('/').get( (req,res) => {
    FeedInfo.find()
        .then(feedinfo => res.json(feedinfo))
        .catch( err => res.status(400).json("Error : "+ err));
});

router.route('/:id').get((req,res) =>{
    FeedInfo.findById(req.params.id)
    .then(feedInfo => res.json(feedInfo))
    .catch(err => res.status(400).json('Error : '+ err));
});


router.route('/:id').delete((req,res) =>{
    FeedInfo.findByIdAndDelete(req.params.id)
    .then(() => res.json('information deleted.'))
    .catch(err => res.status(400).json('Error : '+ err));
});

router.route('/update/:id').post((req,res) =>{
    FeedInfo.findById(req.params.id)
    .then(feedInfo => {
        feedInfo.username = req.body.username;
        feedInfo.feedTime =  Date.parse(req.body.feedTime);
        feedInfo.feedLocation =  req.body.feedLocation;
        feedInfo.foodType =  req.body.foodType;
        feedInfo.foodCategory =  req.body.foodCategory;
        feedInfo.numberOfDucks =  Number(req.body.numberOfDucks);
        feedInfo.foodQuantity =  Number(req.body.foodQuantity);

        feedInfo.save()
            .then( () => res.json("information updated!"))
            .catch(err => res.status(400).json('Error : '+ err));
    })
    .catch(err => res.status(400).json('Error : '+ err));
});


router.route('/add').post( (req,res) => {
    const username = req.body.username;
    const feedTime =  Date.parse(req.body.feedTime);
    const feedLocation =  req.body.feedLocation;
    const foodType =  req.body.foodType;
    const foodCategory =  req.body.foodCategory;
    const numberOfDucks =  Number(req.body.numberOfDucks);
    const foodQuantity =  Number(req.body.foodQuantity);

    const newFeedInfo = new FeedInfo({
        username,
        feedTime,
        feedLocation,
        foodType,
        foodCategory,
        numberOfDucks,
        foodQuantity
    });

    newFeedInfo.save()
        .then( () => res.json('Feed Information submitted!'))
        .catch( err => res.status(400).json('Error : '+ err));


});

module.exports = router;