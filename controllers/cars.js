const mongodb = require('../data/database');

const ObjectId = require('mongodb').ObjectId;

const getAllCars = async (req, res) => {
    //#swagger.tags=['Cars']
    const result = await mongodb.getDatabase().collection('data1').find();
    result.toArray().then((cars) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(cars)
    });
};

const getSingleCar = async (req, res) => {
    //#swagger.tags=['Cars']
    console.log("req.params.id:", req.params.id);
    const carId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().collection('data1').find({_id: carId});
    result.toArray().then((cars) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(cars[0])
    });

};

const createCar = async (req, res) =>{
    //#swagger.tags=['Cars']
    const carId = new ObjectId(req.params.id);
    const car = {
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        color: req.body.color
    };
    const response = await mongodb.getDatabase().collection('data1').insertOne(car);
    if(response.acknowledged){
        res.status(204).send();
    }else{
        res.status(500).json(response.error || 'some error occurred');
    }
};

const updateCar = async (req, res) =>{
    //#swagger.tags=['Cars']
    const carId = new ObjectId(req.params.id);
    const car = {
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        color: req.body.color
    };
    const response = await mongodb.getDatabase().collection('data1').replaceOne({_id: carId}, car);
    if(response.modifiedCount > 0){
        res.status(204).send();
    }else{
        res.status(500).json(response.error || 'some error occurred');
    }
};

const deleteCar = async (req, res) =>{
    //#swagger.tags=['Cars']
    const carId = new ObjectId(req.params.id);
    const car = {
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        color: req.body.color
    };
    const response = await mongodb.getDatabase().collection('data1').deleteOne({_id: carId});
    if(response.modifiedCount > 0){
        res.status(204).send();
    }else{
        res.status(500).json(response.error || 'some error occurred');
    }
}

module.exports = {getAllCars, deleteCar, getSingleCar, updateCar, createCar}