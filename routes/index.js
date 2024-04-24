var express = require("express");
var router = express.Router();
const moment = require("moment");
const LogManager = require("../mikeModules/logManager");

/* GET home page. */
router.get("/", function (req, res, next) {
  let logs = [];

  const now = moment().format("YYYY-MM-DD"); //日付はすべてyyyy-mm-ddの形式で扱う

  //news
  const newsLogManager = new LogManager("news");
  const existsTodayNewsLog = newsLogManager.checkTodayLog(now);
  logs.push(newsLogManager.createLogObject("news", existsTodayNewsLog, "ニュースを見る", "newsButton"));

  //weatherReports
  const weatherReportsLogManager = new LogManager("weatherReports");
  const existsTodayWeatherReportsLog = weatherReportsLogManager.checkTodayLog(now); //yyyy-mm-ddの形式に変換
  logs.push(weatherReportsLogManager.createLogObject("weatherReports", existsTodayWeatherReportsLog, "天気予報を見る", "weatherReportsButton"));

  //bodyWeight
  const bodyWeightLogManager = new LogManager("bodyWeight");
  const existsTodayBodyWeightLog = bodyWeightLogManager.checkTodayLog(now);
  logs.push(bodyWeightLogManager.createLogObject("bodyWeight", existsTodayBodyWeightLog, "体重を記録する", "bodyWeightButton"));

  console.log(logs);
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

  //リクエストボディからbodyWeightを取得し処理
  const bodyWeight = req.body.bodyWeight;
  if (bodyWeight === "bodyWeight") {
    const bodyWeightLogManager = new LogManager(bodyWeight);
    bodyWeightLogManager.writeLog();
  }

  //リダイレクト
  res.redirect("/");
});

module.exports = router;
