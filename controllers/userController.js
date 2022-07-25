import User from "../models/User.js"

export const getUsers = async (req, res)=>{
    User.find()
        .then((result) => {
            res.send(result);
        }).catch((error) => {
            res.status(500).send({
                message: error.message || "some error"
            });
        });
}

export const createUsers = async (req, res) =>{
    const user = new User({
        username: req.body.username,
        password: req.body.password
    })
    user.save() 
        .then((result) => {
            res.send(result);
        }).catch((error) => {
            res.status(409).send({
                message: error.message || "some create error"
            });
        });
}

export const updateUsers = async (req, res)=>{
    User.updateOne({_id: req.params.id}, {$set: req.body})
    .then((result) => {
        res.send(result);
    }).catch((error) => {
        res.status(400).send({
            message: error.message || "some update error"
        });
    });
}

export const deleteUsers = async (req, res)=>{
    User.deleteOne({_id: req.params.id})
    .then((result) => {
        res.send(result);
    }).catch((error) => {
        res.status(404).send({
            message: error.message || "some update error"
        });
    });
}

export const getUsersById = async (req, res)=>{
    User.findById(req.params.id)
        .then((result) => {
            res.send(result);
        }).catch((error) => {
            res.status(500).send({
                message: error.message || "some error"
            });
        });
}