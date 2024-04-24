const fs = require("fs");
const path = require("path");
const moment = require("moment");

class LogManager {
  constructor(logName) {
    this.logFilePath = path.join(__dirname, "../public/logs", logName + ".txt");
    this.now = moment().format("YYYY-MM-DD");
  }

  //その日のログがあるかどうかを確認
  checkTodayLog(targetDate) {
    console.log(targetDate);
    const logFileContent = fs.readFileSync(this.logFilePath, "utf8");
    const logFileLines = logFileContent.split("\n");

    //ログ未記入の時はfalseを返す
    if (logFileLines.length === 0 || logFileLines[0] === "") {
      return false;
    }

    //ログファイルの行ループ
    let result = false;
    logFileLines.map((line) => {
      const logDate = line;
      if (logDate === targetDate) {
        result = true;
      }
    });
    return result;
  }

  //ログファイルの最後尾に日付を追加
  writeLog() {
    if (!this.checkTodayLog(this.now)) {
      fs.appendFileSync(this.logFilePath, "\n" + this.now);
    }
  }

  //ログオブジェクトを作成 route/index.jsで使用
  createLogObject(logName, results, buttonText, idName) {
    return {
      logName: logName,
      results: results,
      buttonText: buttonText,
      idName: idName,
    };
  }
}

module.exports = LogManager;
