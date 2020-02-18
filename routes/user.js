const express = require("express");
const router = express.Router();
const passport = require("passport");

/* GET Google Authentication API. */
router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/", session: false }),
    (req, res) => {
        // const token = req.user.token;
        // // res.send(req.user);
        // res.redirect("http://localhost:3000?token=" + token);

        const userId = req.user.googleId;
        const userEmail = req.user.email;
        const userName = req.user.name;
        // res.redirect(
        //     "http://localhost:3000?user=" +
        //         userId +
        //         "&email=" +
        //         userEmail +
        //         "&name=" +
        //         userName
        // );
        res.redirect(
            "https://pomodoro-app-livid.now.sh?user=" +
                userId +
                "&email=" +
                userEmail +
                "&name=" +
                userName
        );
    }
);

router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});

module.exports = router;
