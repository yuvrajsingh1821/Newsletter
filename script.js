const API_KEY = "85e64fca9e9b400b852ae8109011ec71";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

//function to fetch the news

async function fetchNews(query) {
  const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data = await res.json();
  console.log(data);
  bindData(data.articles);
}

//function to reload the window
function reload() {
  window.location.reload();
}

//Bind the data

function bindData(articles) {
  const cardsContainer = document.getElementById("cards-container");
  const cardsTemplate = document.getElementById("cards-template");

  cardsContainer.innerHTML = "";

  articles.forEach((article) => {
    if (!article.urlToImage) return;
    const cardClone = cardsTemplate.content.cloneNode(true);
    fillDataInCards(cardClone, article);
    cardsContainer.appendChild(cardClone);
  });
}

//function to put the content in cards

function fillDataInCards(cardClone, article) {
  const newsImg = cardClone.querySelector("#news-img");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-source");
  const newsDesc = cardClone.querySelector("#news-desc");

  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });

  newsSource.innerHTML = `${article.source.name} · ${date}`;

  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}

//fetching the data of the nav-links

let currItem = null;
function onNavItemClick(query) {
  fetchNews(query);
  const navItem = document.getElementById(query);
  currItem?.classList.remove("active");
  currItem = navItem;
  currItem.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
  const query = searchText.value;
  if (!query) return;
  fetchNews(query);
  currItem?.classList.remove("active");
  currItem = null;
});
