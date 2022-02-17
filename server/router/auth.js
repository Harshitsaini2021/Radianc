const express = require('express')
const router = express.Router()

router.post('/submittest', (req, res) => {
    //  const {subject,marks,complete}= req.body;
    // console.log(typeof(req.body));
    console.log(req.body);
   res.send("ok")

})
router.post('/submitdpp', (req, res) => {
    //  const {subject,marks,complete}= req.body;
    // console.log(typeof(req.body));
    console.log(req.body);
   res.send("ok")

})
module.exports = router
