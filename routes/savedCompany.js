const { Router } = require("express");
const router = Router();
const auth = require("../middleware/auth");
const saved = require("../controllers/saved");
const multer = require("multer");
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage });

module.exports = (io) => {
  router.post("/add", auth, (req, res) => saved.Save(req, res, io));
  router.get("/get", auth, saved.get);
  router.get("/get_notifications", auth, saved.get_notifications);
  router.post("/upload", upload.single("pdfFile"), auth, saved.sendEmail);
  router.put("/read_notification", auth, saved.read_notifications);
  router.get("/get_recent", auth, saved.get_recent);
  router.delete("/get/:id", auth, saved.delete);

  return router;
};
