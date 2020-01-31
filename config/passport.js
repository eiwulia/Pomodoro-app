const passport = require("passport");
require("dotenv").config();
const db = require("../server/mongo");

const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: "http://localhost:4000/auth/google/callback"
        },
        (accessToken, refreshToken, profile, done) => {
            let userData = {
                name: profile.displayName,
                email: profile.emails[0].value,
                googleId: profile.id,
                photo: profile.photos[0].value,
                token: accessToken
            };
            console.log("user data: ", userData);
            db.addUser(userData, result => {
                console.log("Add user to db");
                // return new user
                return done(null, userData);
            });
            // return old user
            return done(null, userData);
        }
    )
);
