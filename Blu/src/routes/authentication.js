const express = require('express');
const router = express.Router();

router.post('/register', (req, res) => {
    res.status(200).send(JSON.stringify({
        status: 'ok',
        data: 'user succesfully registered'
    }));
});

router.post('/login', (req, res) => {
    res.status(200).send({
        status: 'ok',
        data: 'welcome back!!'
    });
});

router.post('/login-google', (req, res) => {
    res.status(200).send({
        status: 'ok',
        data: 'welcome back!!'
    });
});

module.exports = router;