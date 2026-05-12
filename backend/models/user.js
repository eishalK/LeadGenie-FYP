const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true // Removes accidental spaces at start/end
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        lowercase: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: [6, 'Password must contain at least 6 characters'],
        validate: {
            validator: function(value) {
                // Password must contain at least one uppercase letter, one lowercase letter, and one number
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(value);
            },
            message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number.'
        }
    },

    company: {
        type: String,
        required: [true, 'Please add a company name'],
        trim: true
    },
    
}, { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);    