const express = require("express");
const db = require("../db");

const router = express.Router();

router.get("/", (req, res, next) => {
    res.render("screens/main");
});

router.get("/review", (req, res, next) => {
    const query1 = `
    SELECT	COUNT(id)	AS count,
            AVG(score)	AS avg
      FROM	reviews;
    `;
    const query2 = `
    SELECT	id,
            score,
            content
      FROM	reviews
     ORDER	BY	id	DESC;
    `;
    //데이터가오기
    console.log(db);
    res.render("screens/review");
});

module.exports = router;