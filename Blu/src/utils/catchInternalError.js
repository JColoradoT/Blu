module.exports = (err, res) => {
    console.log(err);
    res.status(500).send({ status: 'error', data: 'internal error' })
}