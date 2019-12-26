const mongoose = require('mongoose');

const accessoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        max: 50,
        required: true
    },
    imageUrl: {
        type: String,
        validate: {
            validator: function (v) {
                return /http/.test(v);
            },
            message: props => `${props.value} is not a valid link!`
        },
        required: true
    },
    cubes: [{type: mongoose.Types.ObjectId, ref: 'Cube'}]
});

module.exports = mongoose.model('Accessories', accessoriesSchema);