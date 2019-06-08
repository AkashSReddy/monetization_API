var express = require("express");
var router = express.Router();
var request = require("request-promise");
/* GET home page. */
router.get("/", function(req, res, next) {
  res.json({ message: "working" });
});

router.get("/getData", async (req, res, next) => {
  try {
    var options = {
      uri: "http://localhost:3000/api/Data",
      headers: {
        "User-Agent": "Request-Promise"
      },
      json: true // Automatically parses the JSON string in the response
    };
    let response = await request(options);
    console.log(response);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json({ message: "error" });
  }
});
module.exports = router;
