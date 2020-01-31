const express = require("express");
const router = express.Router();
const passport = require("passport");

// // auth logout
// router.get('/logout', (req, res) => {
//     // handle with passport
//     res.send('logging out');
// });

/* GET Google Authentication API. */
router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/", session: false }),
    (req, res) => {
        console.log("ladydaaa daa a daddadada", req.user);
        // const token = req.user.token;
        // // res.send(req.user);
        // res.redirect("http://localhost:3000?token=" + token);

        const userId = req.user.googleId;
        const userEmail = req.user.email;
        const userName = req.user.name;
        res.redirect(
            "http://localhost:3000?user=" +
                userId +
                "&email=" +
                userEmail +
                "&name=" +
                userName
        );
    }
);

module.exports = router;
