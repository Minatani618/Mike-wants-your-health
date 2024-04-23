var express = require("express");
var router = express.Router();
const LogManager = require("../mikeModules/logManager");

/* GET home page. */
router.get("/", function (req, res, next) {
  let logs = [];

  //news
  const newsLogManager = new LogManager("news");
  const existsTodayNewsLog = newsLogManager.checkTodayLog(new Date().toISOString().replace(/T.*/, " ")); //yyyy-mm-ddの形式に変換
  logs.push(newsLogManager.createLogObject("news", existsTodayNewsLog, "ニュースを見る", "newsButton"));

  //weatherReports
  const weatherReportsLogManager = new LogManager("weatherReports");
  const existsTodayWeatherReportsLog = weatherReportsLogManager.checkTodayLog(new Date().toISOString().replace(/T.*/, " ")); //yyyy-mm-ddの形式に変換
  logs.push(weatherReportsLogManager.createLogObject("weatherReports", existsTodayWeatherReportsLog, "天気予報を見る", "weatherReportsButton"));

  res.render("index", { logs: logs });
});

router.post("/", function (req, res, next) {
  //リクエストボディからnewsを取得し処理
  const news = req.body.news;
  if (news === "news") {
    const newsLogManager = new LogManager(news);
    newsLogManager.writeLog();
  }

  //リクエストボディからweatherReportsを取得し処理
  const weatherReports = req.body.weatherReports;
  if (weatherReports === "weatherReports") {
    const weatherReportsLogManager = new LogManager(weatherReports);
    weatherReportsLogManager.writeLog();
  }

  //リダイレクト
  res.redirect("/");
});

module.exports = router;
