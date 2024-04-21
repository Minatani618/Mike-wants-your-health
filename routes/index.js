var express = require("express");
var router = express.Router();
const LogManager = require("../mikeModules/logManager");

/* GET home page. */
router.get("/", function (req, res, next) {
  let logs = [];
  const newsLogManager = new LogManager("news");
  const existsTodayLog = newsLogManager.checkTodayLog(new Date().toISOString().replace(/T.*/, " ")); //yyyy-mm-ddの形式に変換
  logs.push(newsLogManager.createLogObject("news", existsTodayLog, "ニュースを見る", "newsButton"));

  res.render("index", { logs: logs });
});

module.exports = router;
