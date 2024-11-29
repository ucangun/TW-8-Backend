/* -------------------------------------------------------
            | FULLSTACK TEAM | Hotel Api|
-------------------------------------------------------- */
const router = require("express").Router();
/* ----------------------------------------------------- */

const {
  signup,
  login,
  logout,
  verifyEmail,
} = require("../controllers/authController");

// URL: /auth

router.post("/signup", signup);
router.post("/login", login);
// router.post("/logout", logout);

router.get("/verifyEmail", verifyEmail);

/* ------------------------------------------------------ */
module.exports = router;
