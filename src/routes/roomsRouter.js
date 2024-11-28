/* -------------------------------------------------------
            | FULLSTACK TEAM | Hotel Api|
-------------------------------------------------------- */
const router = require("express").Router();
const upload = require("../helpers/upload");
/* ----------------------------------------------------- */

const {
  list,
  create,
  read,
  update,
  deleteRoom,
} = require("../controllers/roomController");

// URL: /rooms
router.get("/", list);
router.post("/", upload.single("image"), create);

router.get("/:id", read);
router.put("/:id", update);
router.delete("/:id", deleteRoom);

/* ------------------------------------------------------- */
module.exports = router;
