import express from 'express';
import passport from 'passport';
import { Router } from 'express';
import GoogleStrategy from 'passport-google-oauth20';
import { config } from 'dotenv';
config();
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
},
    function (accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
));


/* 
    APP ROUTES 
*/
const route = Router();
route.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));

route.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/failure', successRedirect: '/dashboard' }),
);
route.get('/failure', (req, res) => {
    res.send('Failed to login');
});
export default route;