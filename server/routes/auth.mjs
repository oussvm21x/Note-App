import express from 'express';
import passport from 'passport';
import { Router } from 'express';
import GoogleStrategy from 'passport-google-oauth20';
import { config } from 'dotenv';
import User from '../models/User.mjs';
import mongoose from 'mongoose';
config();
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
},
    async function (accessToken, refreshToken, profile, done) {
        const newUser = {
            googleId: profile.id,
            displayName: profile.displayName,
            familyName: profile.name.familyName,
            givenName: profile.name.givenName,
            profilePhoto: profile.photos[0].value
        }
        try {
            let user = await User.findOne({ googleId: profile.id });
            if (user) {
                done(null, user);
            } else {
                user = await User.create(newUser);
                done(null, user);
            }
        } catch (err) {
            console.error(err);
            done(err, null);

        }
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
    (req, res) => {
        console.log("User authenticated:", req.user);
    }
);
route.get('/failure', (req, res) => {
    res.send('Failed to login');
});

route.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            res.send('Failed to logout');
        }
        else {
            res.redirect('/');
        }

    }
    );
});

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser(async (user, done) => {
    done(null, user);
})


export default route;