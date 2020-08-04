const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: 1,
        max: 150
    },
    city: {
        type: String,
        required: true
    },
    job: {
        type: String,
        required: true
    }
});

citySchema.set('timestamps', true);

module.exports = mongoose.model('Person', citySchema);