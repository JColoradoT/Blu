const express = require('express');
const router = express.Router();

router.get('/:kidId', (req, res) => {
    res.status(200).send(JSON.stringify({
        status: 'ok',
        data: {
            minutesPlayedToday: 15,
            daysStreak: 4,
            minutePerDayGoal: 15,
            todayStreakCompleted: false
        }
    }));
});

router.post('/start-session/:kidId', (req, res) => {
    res.status(200).send({
        status: 'ok',
        data: `Session succesfully started for kid ${req.params.kidId}`
    });
});

router.delete('/delete-session/:kidId', (req, res) => {
    res.status(200).send({
        status: 'ok',
        data: `Session succesfully deleted for kid ${req.params.kidId}`
    });
});

router.put('/finished-session/:kidId', (req, res) => {
    const playedTime = req.body.playedTime;
    const prevReport = {
        minutesPlayedToday: 2,
        daysStreak: 4,
        minutePerDayGoal: 15,
        todayStreakCompleted: false
    };

    prevReport.minutesPlayedToday += parseInt(playedTime);

    if (prevReport.minutesPlayedToday >= prevReport.minutePerDayGoal && !prevReport.todayStreakCompleted) {
        prevReport.daysStreak++;
        prevReport.todayStreakCompleted = true;
    }

    res.status(200).send({
        status: 'ok',
        data: `Kid ${req.params.kidId} updated: ${JSON.stringify(prevReport)}`
    });
});

module.exports = router;