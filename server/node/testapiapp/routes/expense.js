var express = require("express");
const csv = require("csv-parser");
const fs = require("fs");
var router = express.Router();

/* GET Expense  */
let expense = [];
router.get("/", function (req, res, next) {
  expense = [];
  fs.createReadStream("public/files/expense.csv")
    .pipe(csv())
    .on("data", (row) => {
      expense.push({
        date: new Date(row.Date.split("/").reverse().join("/")),
        category: row.Category,
        description: row.Description,
        amount: parseFloat(row.Amount),
      });
    })
    .on("end", () => {
      console.log("Reading complete");
      console.log(expense.length);
      // var helper = {};
      // var groupedExpense = expense.reduce(function (r, o) {
      //   var key = o.category;

      //   if (!helper[key]) {
      //     helper[key] = Object.assign({}, o); // create a copy of o
      //     helper[key].amount = parseFloat(helper[key].amount);
      //     r.push(helper[key]);
      //   } else {
      //     helper[key].amount += parseFloat(o.amount);
      //   }
      //   return r;
      // }, []);
      return res.json(expense);
    });
});

module.exports = router;
