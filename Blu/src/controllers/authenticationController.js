const User = require('../database/models/User');
const UserVerification = require('../database/models/UserVerification');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const mailer = require('../utils/mail');

require('dotenv').config();

async function sendVerificationCode(user) {
    const { _id, email } = user;

    const uniqueString = uuidv4();
    const url = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : '';

    const salt = await bcrypt.genSalt(10);
    const hashedString = await bcrypt.hash(uniqueString, salt);
}

async function hashPassword(rawPassword) {
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(rawPassword, salt);

    return hashedPwd;
}

async function registerController(req, res) {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).send({ status: 'error', data: 'data is incomplete' });

    const userName = email.split('@')[0];
    const hashedPwd = hashPassword(password);

    // create a non validated user
    const newUser = await User.create({
        email: email,
        name: userName,
        password: hashedPwd
    });

    // send verification code to email
    sendVerificationCode(newUser);

    res.status(200).send(JSON.stringify({
        status: 'ok',
        data: 'user succesfully registered'
    }));
}