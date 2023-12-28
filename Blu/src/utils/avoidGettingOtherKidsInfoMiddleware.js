function avoidGettingOtherKidsInfoMiddleware(req, res, next) {
    const { kid_id } = req.params;

    if (!kid_id) return next();

    const kidInArray = req.user.kids.find((k) => k._id == kid_id)

    if (!kidInArray) return res.status(400).send({ status: 'error', data: 'not authorized' });
    next();
}

module.exports = avoidGettingOtherKidsInfoMiddleware;