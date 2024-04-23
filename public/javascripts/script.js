const metaDiv = document.getElementById("metaDiv");

//news
const newsButton = document.getElementById("newsButton");
newsButton.addEventListener("click", function () {
  window.open("https://news.google.com/?hl=ja&gl=JP&ceid=JP:ja");
  submitPostForm("news", "news");
});

//weatherReports
const weatherReportsButton = document.getElementById("weatherReportsButton");
weatherReportsButton.addEventListener("click", function () {
  window.open("https://weathernews.jp/onebox/35.14/136.85/temp=c#google_vignette");
  submitPostForm("weatherReports", "weatherReports");
});

//postメソッドでフォームを送信
const submitPostForm = (name, value) => {
  const input = document.createElement("input");
  input.type = "hidden";
  input.name = name;
  input.value = value;
  const form = document.getElementById(`${name}Form`);
  form.appendChild(input);
  form.submit();
};
