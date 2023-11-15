const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) => {
    res.status(200).send(JSON.stringify({
        status: 'ok',
        data: `This is kid ${req.params.kidName}`
    }));
});

router.post('/', (req, res) => {
    res.status(200).send({
        status: 'ok',
        data: JSON.stringify(req.body)
    });
});

router.put('/:id', (req, res) => {
    res.status(200).send({
        status: 'ok',
        data: JSON.stringify(req.body)
    });
});

router.delete('/:id', (req, res) => {
    res.status(200).send({
        status: 'ok',
        data: `Kid ${req.params.id} deleted`
    })
});

module.exports = router;