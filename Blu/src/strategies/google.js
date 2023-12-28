const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const GoogleUser = require('../database/models/GoogleUser');

async function SignUpUser(profile) {
    try {
        // create a non validated user
        const newUser = await GoogleUser.create({
            google_id: profile.id,
            name: profile.name.givenName,
        });

        return newUser;
    } catch (error) {
        console.log(error);
        res.status(500).send(JSON.stringify({
            status: 'error',
            data: 'internal error'
        }));
    }
}

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/api/authentication/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await GoogleUser.findOne({ google_id: profile.id });

        if (!user) {
            const newUser = await SignUpUser(profile);
            return done(false, newUser, { code: 201, status: 'ok', data: 'user succesfully created' });
        }

        done(false, user, { code: 201, status: 'ok', data: 'user succesfully signed in' });

    } catch (error) {
        done(error, null, { code: 500, status: 'error', data: 'internal error' });
    }
}
));