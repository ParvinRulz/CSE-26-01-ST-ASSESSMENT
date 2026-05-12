const express = require("express");
const router = express.Router();
const multer = require("multer");

//Import files.
const DashboardForm = require("../Models/dashboardForm");
const TableData = require("../Models/TableData");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
let upload = multer({ storage: storage });

router.get("/dashboard", async (req, res) => {
  const tableData = await TableData.find().sort({ $natural: -1 });
  console.log(tableData);
  res.render("dashboard", {
    tableData,
  });
});

router.post("/dashboard", upload.single("productImage"), async (req, res) => {
  try {
    const newProduct = new DashboardForm(req.body);
    newProduct.productImage = req.file.path;
    await newProduct.save();
    const tableData = await TableData.find().sort({ $natural: -1 });
    res.render("dashboard", {
      tableData,
      successMessage: true,
    });
  } catch (error) {
    console.error(error);
    res.render("dashboard", {
      successMessage: false,
    });
  }
});

module.exports = router;
