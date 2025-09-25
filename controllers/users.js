const mongodb = require('../data/database');

const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Users']
    const result = await mongodb.getDatabase().collection('data').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users)
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Users']
    console.log("req.params.id:", req.params.id);
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().collection('data').find({_id: userId});
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0])
    });

};

const createUser = async (req, res) =>{
    //#swagger.tags=['Users']
    const userId = new ObjectId(req.params.id);
    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().collection('data').insertOne(user);
    if(response.acknowledged){
        res.status(204).send();
    }else{
        res.status(500).json(response.error || 'some error occurred');
    }
};

const updateUser = async (req, res) =>{
    //#swagger.tags=['Users']
    const userId = new ObjectId(req.params.id);
    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().collection('data').replaceOne({_id: userId}, user);
    if(response.modifiedCount > 0){
        res.status(204).send();
    }else{
        res.status(500).json(response.error || 'some error occurred');
    }
};

const deleteUser = async (req, res) =>{
    //#swagger.tags=['Users']
    const userId = new ObjectId(req.params.id);
    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().collection('data').deleteOne({_id: userId});
    if(response.modifiedCount > 0){
        res.status(204).send();
    }else{
        res.status(500).json(response.error || 'some error occurred');
    }
};




module.exports = {getAll, getSingle, createUser, updateUser, deleteUser}