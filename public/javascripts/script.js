const newsButton = document.getElementById("newsButton");

newsButton.addEventListener("click", function () {
  const newsLogManager = new LogManager("news");
  newsLogManager.addLog();
  window.open("https://news.google.com/?hl=ja&gl=JP&ceid=JP:ja");
});
