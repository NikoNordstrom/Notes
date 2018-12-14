const path = require("path");
const fs = require("fs");
const Express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

if (fs.existsSync(path.resolve(__dirname, ".env"))) {
    require("dotenv").config();
}

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
});
const db = mongoose.connection;

db.once("open", () => {
    console.log("Open MongoDB connection");
    app.listen(process.env.PORT, () => {
        console.log(`Listening to port ${process.env.PORT}`);
    });
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/callback"
}, (accessToken, refreshToken, profile, cb) => {
    console.log(profile.displayName);
    return cb(null, profile);
}));

passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((obj, cb) => {
    cb(null, obj);
});

const app = new Express();

app.use(Express.static(path.resolve(__dirname, "dist")));
app.use(session({
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({
        mongooseConnection: db
    }),
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.get("/auth/google", passport.authenticate("google", { scope: ["profile"] }));
app.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/error" }), (req, res) => {
    res.redirect("/");
});