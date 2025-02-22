const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    userName: { type: String, required: true },
    score: { type: Number, required: true }

});

// Update the updatedAt timestamp before saving
// userSchema.pre('save', function(next) {
//     this.updatedAt = Date.now();
//     next();
// });


module.exports = mongoose.model('User', userSchema);
