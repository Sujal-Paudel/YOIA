const router = require("express").Router();
const formidable = require("formidable");
const path = require("path");

const checkAuth = require("../middleware/checkauth");

router.put("/:directory", checkAuth({ userType: "admin" }), (req, res) => {
  const { directory } = req.params;

  const form = new formidable.IncomingForm();
  form.maxFileSize = process.env.maxFileSizeMB * 1024 * 1024;
  form.uploadDir = `./public/${directory}`;
  const validFiles = ["jpg", "png", "jpeg", "webp", "gif"];

  const fileName = [];

  form.on("fileBegin", function (field, file) {
    const ext = file.name.split(".").pop();
    if (validFiles.includes(ext)) {
      const name = `${new Date().getTime()}${Math.random()
        .toString()
        .substr(2, 3)}.${ext}`;
      file.path = path.join(form.uploadDir, name);
      fileName.push(name);
    } else {
      return;
    }
  });
  form.on("aborted", () => {
    console.log("Request aborted by the user");
  });
  form.on("error", (err) => {
    console.log(err.message);
  });
  form.on("end", function () {
    if (!fileName.length) {
      res.status(403).json({ success: false });
    } else {
      res.status(201).json({ success: true, fileName });
    }
  });

  form.parse(req);
});

module.exports = router;
