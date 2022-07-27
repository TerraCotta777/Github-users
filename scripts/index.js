import "./customHeader.js";
import { createCardUser } from "./createCard.js";

const userName = document.querySelector("#username");
const sort = document.querySelector("#sort");
const perPage = document.querySelector("#perPage");
const results = document.querySelector("#results");
const prevButton = document.querySelector("#prev");
const nextButton = document.querySelector("#next");
const currentPage = document.querySelector("#current");
const url = "https://api.github.com/search/";
let currentPageValue;
let maxPages = 1;

if (userName) {
  currentPageValue = +currentPage.textContent;
  let maxPages = 1;
  userName.addEventListener("keyup", debounce(getUsers, 500));
  nextButton.addEventListener("click", nextPage);
  prevButton.addEventListener("click", prevPage);
}

// ================== PAGINATION ==================

function nextPage() {
  if (currentPageValue < maxPages) currentPageValue += 1;
  else currentPageValue = 1;
  currentPage.textContent = currentPageValue;
  getUsers();
}

function prevPage() {
  if (currentPageValue > 1) currentPageValue -= 1;
  else currentPageValue = maxPages;
  currentPage.textContent = currentPageValue;
  getUsers();
}

// ================== SEARCH USERS ==================

async function getUsers(e) {
  clear();
  let queryString = `${url}users?q=${userName.value}&per_page=${perPage.value}&page=${currentPageValue}&s=${sort.value}&order=desc`;
  console.log(queryString);
  const response = await fetch(queryString);
  if (response.ok) {
    const result = await response.json();
		let totalItems = result.total_count > 999 ? 999 : result.total_count
    maxPages = Math.ceil(totalItems / perPage.value);
    console.log(maxPages);
    result.items.forEach((user) => {
      const card = createCardUser(
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

// ================== SEARCH REPOS ==================

async function getRepos(e) {
  location.href = "./repos.html";
  clear();
  const id = e.target.textContent;
  // const queryString = `${url}repositories?q=id=`
  ("https://api.github.com/search/repositories?q=stars:150000..300000");
  const response = await fetch(url);
  const result = await response.json();
}

function someFunc() {
  console.log("isfave");
}

// ================== DELAY FUNCTION ==================

function debounce(func, wait, immediate) {
  let timeout;
  return function () {
    const context = this,
      args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// ================== CLEARING RESULTS ==================

function clear() {
  while (results.firstChild) results.removeChild(results.firstChild);
}
