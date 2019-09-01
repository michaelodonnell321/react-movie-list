const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.put('/:id', (req, res) => {
    //req.params is id of movie that was clicked to get details for
    console.log('req.params is', req.params);
    //rep.body has name and escription of movie from edit
    console.log('req.body is', req.body)
    let detailsId = req.params.id;
    let newName = req.body.name;
    let newDescription = req.body.description;
    const queryText = `
    UPDATE "movies" SET "title"=$1, "description"=$2
    WHERE id = $3;`;
    pool.query(queryText, [newName, newDescription, detailsId])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((err) => {
            console.log('error with movies get', err);
            res.sendStatus(500);
        })
})

module.exports = router;