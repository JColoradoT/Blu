const User = require('../database/models/User');
const UserVerification = require('../database/models/UserVerification');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const mailer = require('../utils/mail');
const { default: mongoose, Types, isValidObjectId } = require('mongoose');

require('dotenv').config();

async function sendVerificationCode(user) {
    const { _id, email } = user;

    const uniqueString = uuidv4();
    const url = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : '';

    const endpoint = `${url}api/authentication/verify-email/${_id}/${uniqueString}`

    // creates the UserVerification in DB
    UserVerification.create({
        user_id: new Types.ObjectId(_id),
        unique_string: uniqueString,
    });

    // then we send the email
    return mailer.sendMail({
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: 'Verifica tu email',
        html: `<p>Verifica tu email para completar el registro.</p><p>Este link <b>expira en 1 hora</b>.</p><p>Dale clic al siguiente link <a href=${endpoint}> para continuar con el registro.</p>`
    });
}

async function hashPassword(rawPassword) {
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(rawPassword, salt);

    return hashedPwd;
}

// MAIN CONTROLLERS

async function registerController(req, res) {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).send({ status: 'error', data: 'data is incomplete' });

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            // si hay un user verificado retornamos error
            if (existingUser.verified) {
                return res.status(400).send({ status: 'error', data: 'email is already being used' });
            }
            // si no está verificado, lo eliminamos y procedemos
            else await existingUser.deleteOne();

            const userVerificationExists = await UserVerification.exists({ user_id: existingUser._id });
            // si hay un UserVerification, entonces lo eliminamos para generar otro link
            if (userVerificationExists) {
                await UserVerification.findOneAndDelete({ user_id: existingUser._id });
            }
        }

        const userName = email.split('@')[0];
        const hashedPwd = await hashPassword(password);

        // create a non validated user
        const newUser = await User.create({
            email: email,
            name: userName,
            password: hashedPwd
        });

        // send verification code to email
        sendVerificationCode(newUser)
            .then(() => {
                res.status(200).send(JSON.stringify({
                    status: 'pending',
                    data: 'verification email sent'
                }));
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send(JSON.stringify({
                    status: 'error',
                    data: 'an error occurred trying to send the verification email'
                }));
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(JSON.stringify({
            status: 'error',
            data: 'internal error'
        }));
    }
}

async function verifyEmailController(req, res) {
    const { user_id } = req.params;
    const paramString = req.params.unique_string;

    const isIdValid = isValidObjectId(user_id);
    if (!isIdValid) return res.status(400).send({ status: 'error', data: 'user id is not valid' });

    try {
        const verificationUser = await UserVerification.findOne({ user_id });
        if (!verificationUser) return res.status(400).send({
            status: 'error',
            data: 'account record does not exist or has been verified already, please sign up or login'
        });
        const { _id, expires_at, unique_string } = verificationUser;

        console.log(`this is expires_at: ${expires_at}, adn this is now: ${Date.now()}`);

        const isExpired = expires_at.getMilliseconds() >= Date.now();
        if (isExpired) {
            await UserVerification.findByIdAndDelete(_id);
            await User.findByIdAndDelete(user_id);
            return res.status(400).send({ status: 'error', data: 'verification link has expired, try signin up again' });
        }

        const isValidString = unique_string === paramString;
        if (!isValidString) return res.status(400).send({ status: 'error', data: 'invalid verification details' });

        await UserVerification.findByIdAndDelete(_id);
        await User.findByIdAndUpdate(user_id, { verified: true });

        res.status(200).send({ status: 'ok', data: 'user succesfully verified' });

    } catch (err) {
        console.log(err);
        res.status(500).send('internal error');
    }
}

module.exports = {
    registerController,
    verifyEmailController
}