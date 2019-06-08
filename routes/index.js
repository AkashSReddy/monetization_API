var express = require("express");
var router = express.Router();
var request = require("request-promise");
var Data = require("../models/data");
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

router.post("/newData", async (req, res, next) => {
  try {
    let data = new Data();
    data.name = req.body.name;
    data.type = req.body.type;
    data.group = req.body.group;
    data.records = req.body.records;
    await data.save();
    var options = {
      method: "POST",
      uri: "http://localhost:3000/api/Data",
      body: {
        $class: "org.me.cto.Data",
        dataId: data.id,
        forTrade: true,
        owner: "resource:org.me.cto.User#1"
      },
      json: true
    };
    let response = await request(options);
    console.log(response);
    res.json(response);
    // var stuff = JSON.parse(data.records);
    // res.json(stuff);
  } catch (error) {
    console.log(error);
    res.json({ message: "error" });
  }
});

router.get("/factors", (req, res, next) => {});
module.exports = router;
