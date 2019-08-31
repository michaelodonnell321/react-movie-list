const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/:id', (req, res) => {
    //req.params is id of movie that was clicked to get details for
    console.log('req.params is', req.params);
    let detailsId = req.params.id;
    const queryText = `
    SELECT * FROM "movies"
    WHERE "id" = $1;`;
    pool.query(queryText, [detailsId])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((err) => {
            console.log('error with movies get', err);
            res.sendStatus(500);
        })
})

module.exports = router;