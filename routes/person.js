const express = require('express');
const Person = require('../models/person');
const { response } = require('express');

const router = express.Router();


// 1. Get All
router.get('/', async (req, res) => {
    try {
        const perople = await Person.find().sort('-updatedAt');
        return res.json(perople);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// 2. Get One
router.get('/:id', getPersonById, (req, res) => {
    return res.json(res.person);
});

// 3. Create One
router.post('/', async (req, res) => {
    let person = new Person({
        name: req.body.name,
        age: req.body.age,
        city: req.body.city,
        job: req.body.job
    });

    try {
        person = await person.save();
        return res.status(201).json(person);
    } catch (error) {
        return res.status(400).json({ errors: error.message.split(',') });
    }
});

// 4. Update One
router.put('/:id', getPersonById, async (req, res) => {
    if(Object.keys(req.body).length == 0) return res.status(400).json({ message: 'Nothing to update.' });

    let person = res.person;

    if(req.body.name) person.name = req.body.name;
    if(req.body.age) person.age = req.body.age;
    if(req.body.city) person.city = req.body.city;
    if(req.body.job) person.job = req.body.job;

    try {
        person = await person.save();
        return res.json(person);
    } catch (error) {
        return res.status(400).json({ error: error.message.split(',') });
    }
});

// 5. Delete One
router.delete('/:id', getPersonById, async (req, res) => {
    let person = res.person;
    try {
        await person.delete();
        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ error: error.message.split(',') });
    }
});

async function getPersonById(req, res, next) {
    let person;
    try {
        person = await Person.findById(req.params.id);
        if (!person) return res.status(404).json({ message: "Person with this id does not exist." });
    } catch (error) {
        return res.status(404).json({ message: "Person with this id does not exist." });
    }

    res.person = person;

    next();
}

module.exports = router;