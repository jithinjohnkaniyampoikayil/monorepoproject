var express = require("express");
const csv = require("csv-parser");
const fs = require("fs");
var router = express.Router();
let expense = [];
/* GET home page. */
router.get("/", function (req, res, next) {
  fs.createReadStream("public/files/expense.csv")
    .pipe(csv())
    .on("data", (row) => {
      expense.push(row);
    })
    .on("end", () => {
      console.log("Reading complete");
      console.log(expense.length);
      var helper = {};
      var groupedExpense = expense.reduce(function (r, o) {
        var key = o.Category;

        if (!helper[key]) {
          helper[key] = Object.assign({}, o); // create a copy of o
          helper[key].Amount = parseFloat(helper[key].Amount);
          r.push(helper[key]);
        } else {
          helper[key].Amount += parseFloat(o.Amount);
        }
        return r;
      }, []);
      expense = [];
      return res.json(groupedExpense);
    });
});

module.exports = router;
