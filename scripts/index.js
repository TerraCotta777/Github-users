import { createCard } from "./createCard.js";

const userName = document.querySelector("#username");
const perPage = document.querySelector("#perPage");
// const formSearch = document.querySelector("#form");
const results = document.querySelector("#results");
const prevButton = document.querySelector("#prev");
const nextButton = document.querySelector("#next");
const currentPage = document.querySelector("#current");
let currentPageValue = +currentPage.textContent;
let maxPages = 1;

userName.addEventListener("keyup", getUsers);
nextButton.addEventListener("click", getUsers);
prevButton.addEventListener("click", getUsers);

function queryString(user, perPage, event) {
  const url = "https://api.github.com/search/users";
  if (event.target.id === "next" && currentPageValue < maxPages) {
    currentPageValue += 1;
  } else if (event.target.id === "prev") currentPageValue -= 1;
  let queryString = `${url}?q=${user}&per_page=${perPage}&page=${currentPageValue}`;
  currentPage.textContent = currentPageValue;
  return queryString;
}

async function getUsers(e) {
  clear();
  const response = await fetch(queryString(userName.value, perPage.value, e));
  if (response.ok) {
    const result = await response.json();
    maxPages = +response.headers
      .get("link")
      .split("&page=")[2]
      .replace(/[^0-9]/g, "");
    result.items.forEach((user) => {
      const card = createCard(
        user.id,
        user.avatar_url,
        user.login,
        user.html_url,
        getRepos,
        someFunc
      );
      results.appendChild(card);
    });
  }
}

async function getRepos() {
  console.log("getRepos");
}

function someFunc() {
  console.log("isfave");
}

function clear() {
  while (results.firstChild) results.removeChild(results.firstChild);
}
