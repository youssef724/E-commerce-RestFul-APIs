const mongoose = require('mongoose');
const validator = require('validator');
const express = require('express');
const { default: isEmail } = require('validator/lib/isEmail');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please provide a first name'],
        minlength: [3, 'First name must be at least 3 characters long'],
        maxlength: [30, 'First name must be at most 30 characters long']
    },
    lastName: {
        type: String,
        required: [true, 'Please provide a last name'],
        minlength: [3, 'Last name must be at least 3 characters long'],
        maxlength: [30, 'Last name must be at most 30 characters long']
    },
    email:{
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [6, 'Password must be at least 6 characters long'],
        select: false
    },
    token:{
        type: String
    },
    role:{
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
});

module.exports = mongoose.model('User', UserSchema);
