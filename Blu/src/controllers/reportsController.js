const KidReport = require('../database/models/KidReport')
const GameSession = require('../database/models/GameSession')
const catchInternalError = require('../utils/catchInternalError');
const gamesInfo = require('../constant_data/gamesInfo');
const { default: mongoose } = require('mongoose');

// PRIVATE FUNCTIONS
async function createReport(kidId) {
    const newKid = await KidReport.create({
        kid_id: kidId
    });

    return newKid;
}

async function getKidReport(req, res) {
    try {
        const { kid_id } = req;
        let report = await KidReport.findOne({ kid_id });

        // if there's no report, create a new one
        if (!report) report = await createReport(kid_id);

        res.status(200).send({ status: 'ok', data: report });

    } catch (err) {
        catchInternalError(err, res)
    }
}

async function startSession(req, res) {
    try {
        const { kid_id } = req;
        const { game_name } = req.body;

        // INCOMPLETE DATA
        if (!kid_id || !game_name) return res.status(400).send({ status: 'error', data: 'incomplete data' });

        // ACTIVE SESSION
        const currentSession = await GameSession.findOne({ kid_id });
        if (currentSession) return res.status(400).send({
            status: 'error',
            data: 'there is an active session already, go to /delete-session to delete it without generating any reports'
        });


        await GameSession.create({ kid_id, game_name });
        res.status(200).send({ status: 'ok', data: 'session succesfully created' });
    } catch (err) {
        catchInternalError(err, res);
    }
}

async function deleteSession(req, res) {
    try {
        const { kid_id } = req;

        // ACTIVE SESSION
        const currentSession = await GameSession.findOne({ kid_id });
        if (!currentSession) return res.status(400).send({
            status: 'error',
            data: 'there is no currently active session'
        });

        await currentSession.deleteOne();

        res.status(200).send({ status: 'ok', data: 'session succesfully deleted' });
    } catch (err) {
        catchInternalError(err, res);
    }
}

async function finishSession(req, res) {
    const session = await mongoose.startSession();

    try {
        const { kid_id } = req;

        // WE CHECK IF THERE'S AN ACTIVE SESSION
        const currentGameSession = await GameSession.findOne({ kid_id });
        if (!currentGameSession) return res.status(400).send({
            status: 'error',
            data: 'there is no currently active session'
        });

        const now = new Date();
        const minutesPlayed = new Date(now - currentGameSession.created_at).getMinutes();

        // WE CHECK IF THE GAME WAS FAIR
        if (minutesPlayed >= gamesInfo[currentGameSession.game_name].minPlayTime) {
            let report = await KidReport.findOne({ kid_id });

            session.startTransaction();

            // IF THERE'S NO REPORT, WE CREATE A NEW ONE
            if (!report)
                report = await createReport(kid_id);

            report.minutes_played_today += gamesInfo[currentGameSession.game_name].playTime

            // we delete the current session
            await currentGameSession.deleteOne();

            // check if today's streak has been completed, and saves it into its field
            const isTodayStreakCompleted = report.today_streak_completed;
            if (!isTodayStreakCompleted && report.minutes_played_today >= report.minutes_per_day_goal) {
                report.today_streak_completed = true;
                report.days_streak++;
            }
            report.save();

            await session.commitTransaction();
            await session.endSession();

            res.status(200).send({ status: 'ok', data: report });
        }
        else {
            await currentGameSession.deleteOne();
            res.status(400).send({ status: 'cheater!', data: 'did you actually try to cheat on an autism game? :/' });
        }
    } catch (err) {
        if (session.inTransaction()) {
            await session.abortTransaction();
            await session.endSession();
        }

        catchInternalError(err, res);
    }
}

module.exports =
{
    getKidReport,
    startSession,
    deleteSession,
    finishSession
}