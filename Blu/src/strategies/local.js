const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../database/models/User');
const bcrypt = require('bcryptjs');
const GoogleUser = require('../database/models/GoogleUser');

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser(async (userId, done) => {
    let user = await User.findById(userId);
    if (!user) user = await GoogleUser.findById(userId);

    if (!user) throw new Error('User not found!');

    done(null, user);
});

passport.use(new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
        try {
            const allCredentials = email && password;
            if (!allCredentials) return done(null, null, { code: 400, status: 'error', data: 'missing credentials' });

            const user = await User.findOne({ email });
            if (!user) return done(null, null, { code: 400, status: 'error', data: 'invalid credentials' });

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) return done(null, null, { code: 400, status: 'error', data: 'invalid credentials' });

            // succesfully logged in
            done(null, user, { code: 200, status: 'ok', data: 'user succesfully logged in' });
        } catch (error) {
            done(error, null, { code: 500, status: 'error', data: 'internal error' });
        }
    }));