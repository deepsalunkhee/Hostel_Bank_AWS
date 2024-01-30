const mongoose = require('mongoose');
const { string } = require('zod');

// User schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    groups: [{
        group_id: {
            type: String,
            required: false
        },
        group_name: {
            type: String,
            required: false
        }
    }],
    notification: [{
        type: {
            type: String,
            required: false
        },
        status: {
            type: Boolean,
            required: false
        }
    }]
});

// Group schema
const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    users: [{
        email: {
            type: String,
            required: true
        }
    }]
});


// Export models
const User = mongoose.model('User', userSchema);
const Group = mongoose.model('Group', groupSchema);

module.exports = { User, Group };
