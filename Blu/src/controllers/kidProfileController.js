const { isValidObjectId, default: mongoose } = require('mongoose')
const Kid = require('../database/models/Kid')
const catchInternalError = require('../utils/catchInternalError')
const User = require('../database/models/User')
const GoogleUser = require('../database/models/GoogleUser')

async function getAllKids(req, res) {
    try {
        const user_id = req.user._id;

        const kids = await Kid.find({ user_id });

        res.status(200).send({ status: 'ok', data: kids })
    } catch (err) {
        catchInternalError(err, res);
    }
}

async function getOneKid(req, res) {
    try {
        // check if kid_id is valid
        const { kid_id } = req.params
        if (!isValidObjectId(kid_id)) return res.status(400).send({ status: 'error', data: 'invalid kid_id' })

        const kid = await Kid.findById(kid_id);
        if (!kid) return res.status(400).send({ status: 'error', data: 'kid not found' })

        res.status(200).send({ status: 'ok', data: kid })
    } catch (err) {
        catchInternalError(err, res);
    }
}

async function createNewKid(req, res) {
    const session = await mongoose.startSession();
    try {
        const { name, age } = req.body;
        if (!name || !age) return res.status(400).send({ status: 'ok', data: 'data is not complete' });

        const user = req.user;
        const user_id = user._id;

        session.startTransaction();

        const newKid = await Kid.create({ user_id, name, age });
        user.kids.push(newKid._id);
        await user.save();

        await session.commitTransaction();
        await session.endSession();

        res.status(201).send({ status: 'ok', data: 'kid succesfully created' });
    } catch (err) {
        if (session.inTransaction()) {
            await session.abortTransaction();
        }
        await session.endSession();
        catchInternalError(err, res);
    }
}

async function updateKid(req, res) {
    try {
        const { name, age } = req.body;
        if (!name || !age) return res.status(400).send({ status: 'ok', data: 'data is not complete' });

        const kidId = req.params.kid_id;
        await Kid.findByIdAndUpdate(kidId, { name, age });

        res.status(200).send({ status: 'ok', data: 'kid data succesfully updated' })
    } catch (err) {
        catchInternalError(err, res);
    }
}

async function deleteKid(req, res) {
    const session = await mongoose.startSession();
    try {
        const kid_id = req.params.kid_id;

        const user = req.user;

        session.startTransaction();

        // delete the kid from the array of the user
        user.kids.pull(kid_id);
        await user.save();
        await Kid.findByIdAndDelete(kid_id);

        await session.commitTransaction();
        await session.endSession();

        res.status(200).send({ status: 'ok', data: 'kid data succesfully deleted' })
    } catch (err) {
        if (session.inTransaction()) {
            await session.abortTransaction();
        }
        await session.endSession();

        catchInternalError(err, res);
    }
}

module.exports = {
    getAllKids,
    getOneKid,
    createNewKid,
    updateKid,
    deleteKid
}