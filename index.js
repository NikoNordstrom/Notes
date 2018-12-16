const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const Express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

if (fs.existsSync(path.resolve(__dirname, ".env"))) {
    require("dotenv").config();
}

const { userSchema } = require("./schemas");
const User = mongoose.model("User", userSchema);
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
    User.findOneAndUpdate({ id: profile.id }, profile, { upsert: true, new: true }, (err, user) => {
        if (err) return console.error(err);
        return cb(null, user);
    });
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findOne({ id: id }, (err, user) => {
        if (err) return console.error(err);
        done(null, user);
    });
});

const app = new Express();

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

const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated() && req.user) {
        console.log(`${req.user.displayName} is authenticated.`);
        return next();
    }
    res.redirect("/auth/google");
};
app.get("/", ensureAuthenticated);
app.use(Express.static(path.resolve(__dirname, "dist")));
app.use(bodyParser.json());

app.get("/auth/google", passport.authenticate("google", { scope: ["profile"] }));
app.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/auth/google" }), (req, res) => {
    res.redirect("/");
});
app.get("/user", ensureAuthenticated, (req, res) => {
    User.findOne({ id: req.user.id }, (err, user) => {
        if (err) return console.error(err);
        res.set("Content-Type", "application/json");
        res.send({
            displayName: user.displayName,
            notes: user.notes
        });
    });
});
app.get("/logout", ensureAuthenticated, (req, res) => {
    req.session.destroy(err => {
        if (err) return console.error(err);
    });
    req.logout();
    res.redirect("/");
});
app.post("/note", ensureAuthenticated, (req, res) => {
    console.log(req.body);
    if (req.body.action === "edit" && req.body.id !== null) {
        User.findOneAndUpdate({ id: req.user.id, "notes._id": req.body.id }, {
            $set: {
                "notes.$.title": req.body.title,
                "notes.$.content": req.body.content
            }
        }, { new: true }, (err, user) => {
            if (err) {
                console.error(err);
                return res.end();
            }
            res.set("Content-Type", "application/json");
            res.send(user.notes);
        });
    }
    else if (req.body.action === "delete" && req.body.id) {
        User.findOneAndUpdate({ id: req.user.id }, {
            $pull: { notes: { _id: req.body.id } }
        }, { new: true }, (err, user) => {
            if (err) {
                console.error(err);
                return res.end();
            }
            res.set("Content-Type", "application/json");
            res.send(user.notes);
        });
    }
    else {
        User.findOneAndUpdate({ id: req.user.id }, {
            $push: { notes: req.body }
        }, { new: true }, (err, user) => {
            if (err) {
                console.error(err);
                return res.end();
            }
            res.set("Content-Type", "application/json");
            res.send(user.notes);
        });
    }
});