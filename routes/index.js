var express = require('express');
var router = express.Router();

router.get('/Helloo', (req, res)=>{
    res.json({response: "Habibi", details: {project_name: "TASK 2", description: "Task 2 project ..." } });
});

// if no url matched
router.get('/*', (req, res) => {
    return res.json({status: false, message: "wrong url..."});
});


module.exports = router;