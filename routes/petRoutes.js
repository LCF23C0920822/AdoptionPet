//Miguel Poma
//c0920822
const express = require('express');
const Pet = require('../models/Pet');

const router = express.Router();



// Add new pet
router.post('/pets', async (req, res) => {
    try {
        const pet = new Pet(req.body);
        await pet.save();
        res.status(201).send(pet);
    } catch (err) {
        res.status(400).send(err);
    }
});


/*router.get('/pets', async (req, res) => {
    try {
        const pets = await Pet.find();
        res.send(pets);
    } catch (err) {
        res.status(500).send(err);
    }
});*/

router.get('/pets', async (req, res) => {
    const { type } = req.query; 
    try {
        let query = {};
        if (type) {
            query.type = type; 
        }
        const pets = await Pet.find(query); 
        res.send(pets);
    } catch (err) {
        res.status(500).send(err);
    }
});


router.get('/adopt/:id', async (req, res) => {
    try {
        console.log('Servidor dice-parametro recibido:', req.params)
        const pet = await Pet.findById(req.params.id); 
        if (!pet) {
            return res.status(404).send({ message: 'Pet not found' }); 
        }
        res.send(pet); 
    } catch (err) {
        res.status(500).send(err); 
    }
});

// Delete Pets
router.delete('/pets/:id', async (req, res) => {
    try {
        await Pet.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(500).send(err);
    }
});

// Update Pet
router.put('/updatePet/:id', async (req, res) => {
    try 
    {
        const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(pet);
    } catch (err) {
        res.status(400).send(err);
    }
});


module.exports = router;
