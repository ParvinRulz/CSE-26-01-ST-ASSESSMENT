const express = require("express");
const router = express.Router();

// Import model files
const TableData = require("../Models/TableData");

router.get("/tableData", (req, res) => {
  //let recentActivity = await RecentActivity.find({status:"Parked"}).sort({$natural:-1})
  res.render("tableData");
});

router.post("/add-tableData", async (req, res) => {
  try {
    console.log("req", req);
    const newTableData = new TableData(req.body);
    console.log(newTableData);
    await newTableData.save();
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.render("tableData");
  }
});

module.exports = router;
