//Miguel Poma
//c0920822
const express = require('express');
const User = require('../models/User');

const router = express.Router();


// Add new user
router.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Read Users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (err) {
        res.status(500).send(err);
    }
});


router.get('/users/names', async (req, res) => {
    try {
        const users = await User.find({}, { _id: 1, firstName: 1, lastName: 1 });
        console.log('**** Users fetched from DB:', users);  // Verifica lo que se está recuperando
        res.status(200).send(users);
    } catch (err) {
        res.status(500).send({ message: 'Internal server error' });
    }
});

router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id); 
        if (!user) {
            return res.status(404).send({ message: 'User not found' }); 
        }
        res.send(user); 
    } catch (err) {
        res.status(500).send(err); 
    }
});

// Update User
router.put('/updateUser/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(user);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Delete User
router.delete('/users/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(500).send(err);
    }
});



module.exports = router;
