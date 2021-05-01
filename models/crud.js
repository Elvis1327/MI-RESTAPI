const { Schema, model } = require('mongoose');

const crudSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
})

module.exports = model('crud', crudSchema);