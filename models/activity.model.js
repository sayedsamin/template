const mongoose = require('mongoose');


const activitySchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true }
});



module.exports = mongoose.model('Activity', activitySchema);
