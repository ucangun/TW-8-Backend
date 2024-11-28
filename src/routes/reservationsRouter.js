/* -------------------------------------------------------
            | FULLSTACK TEAM | Hotel Api|
-------------------------------------------------------- */
const router = require("express").Router();
/* ----------------------------------------------------- */

const {
  list,
  create,
  read,
  update,
  deleteReservation,
} = require("../controllers/reservationsController");

// URL: /reservations
router.get("/", list);
router.post("/", create);

router.get("/:id", read);
router.put("/:id", update);
router.delete("/:id", deleteReservation);

/* ------------------------------------------------------- */
module.exports = router;
