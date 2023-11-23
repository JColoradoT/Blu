const express = require('express');
const router = express.Router();

/**
 * @openapi
 *  /api/kids/:
 *      get:
 *          description: Retrieve all kids from a user
 *          tags: [Kids]
 */
router.get('/', (req, res) => {
    res.status(200).send(JSON.stringify({
        status: 'ok',
        data: [{ name: 'kid1' }, { name: 'kid2' }]
    }));
});

router.get('/:kid_id', (req, res) => {
    res.status(200).send(JSON.stringify({
        status: 'ok',
        data: `This is kid ${req.params.kidName}`
    }));
});

router.post('/kids/', (req, res) => {
    res.status(200).send({
        status: 'ok',
        data: JSON.stringify(req.body)
    });
});

router.put('/:kid_id', (req, res) => {
    res.status(200).send({
        status: 'ok',
        data: JSON.stringify(req.body)
    });
});

router.delete(':kid_id', (req, res) => {
    res.status(200).send({
        status: 'ok',
        data: `Kid ${req.params.id} deleted`
    })
});

module.exports = router;