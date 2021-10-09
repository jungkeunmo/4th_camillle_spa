const express = require("express");
const db = require("../db");

const router = express.Router();

router.get("/", (req, res, next) => {
    res.render("screens/main");
});

router.get("/review", async (req, res, next) => {

    let result1 = null;
    let result2 = null;

    //데이터가오기
    const query1 = `
    SELECT	COUNT(id)	AS count,
            AVG(score)	AS avg
      FROM	reviews
    `;
    const query2 = `
    SELECT	id,
            score,
            content
      FROM	reviews
     ORDER	BY	score	DESC
    `;

    try {
        db.query(query1, (error, result) => {
            if(error) {
                return console.error(error);
            }
            result1 = result;

            db.query(query2, (error, result) => {
                if(error) {
                    return console.error(error);
                }
                result2 = result;

                console.log(result1[0]);
                console.log(result2);

                res.render("screens/review", {
                    result1:result1[0],
                    result2:result2,
                });
            });
        });

        //db.query(query2, (error, result) => {
            //if(error) {
                //return console.error(error);
            //}
            //result2 = result;
        //});


    } catch (error) {
        console.log(error);
    }

});

router.post("/reviewCreate", (req, res) => {
    console.log(req.body.score);
    console.log(req.body.content);

    const insertQuery = `
        INSERT INTO reviews (
            score,
            content
        ) VALUES (
            ${req.body.score},
            "${req.body.content}"
        )
    `;

    try {
        db.query(insertQuery, (error, result) => {
            if(error) {
                console.log(error);
            }

            res.redirect("/review");
        });
    } catch (error) {
        console.error(error);
        res.redirect("/review");
    }
});

module.exports = router;