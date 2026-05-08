const express = require("express");
const router = express.Router();
const multer = require("multer");

//Import files.
const dashboardForm = require("../Models/dashboardForm");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
let upload = multer({ storage: storage });

router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

router.post(
  "/dashboard",
  upload.single("productImage"),
  async (req, res) => {
    try {
      const newProduct = new Product(req.body);
      newProduct.productImage = req.file.path;
      console.log(newProduct);
      await newProduct.save();
      res.redirect("/");
    } catch (error) {
      console.error(error);
      res.render("dashboard");
    }
  },
);

module.exports = router;