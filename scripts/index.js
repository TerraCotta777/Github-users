import "./customHeader.js";
import { createCardUser } from "./createCard.js";
import { getRepos } from "./getRepos.js";
import { addToFaves } from "./faves.js";

const userName = document.querySelector("#username");
const sort = document.querySelector("#sort");
const order = document.querySelector("#order");
const perPage = document.querySelector("#perPage");
const results = document.querySelector("#results");
const prevButton = document.querySelector("#prev");
const nextButton = document.querySelector("#next");
const currentPage = document.querySelector("#current");
const url = "https://api.github.com/search/";
let currentPageValue;
let maxPages = 1;

if (userName) {
  perPage.addEventListener("keyup", debounce(getUsers, 700));
  sort.addEventListener("change", getUsers);
  order.addEventListener("change", getUsers);

  currentPageValue = +currentPage.textContent;
  let maxPages = 1;
  userName.addEventListener("keyup", debounce(getUsers, 500));
  nextButton.addEventListener("click", nextPage);
  prevButton.addEventListener("click", prevPage);
}

export const faves = localStorage.getItem("faves")
  ? JSON.parse(localStorage.getItem("faves"))
  : localStorage.setItem("faves", JSON.stringify({}));

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
  results.innerHTML = `<div class="loader"></div>`;
  let queryString = `${url}users?q=${userName.value}&per_page=${perPage.value}&page=${currentPageValue}&sort=${sort.value}&order=${order.value}`;
  const response = await fetch(queryString);
  if (response.ok) {
    const result = await response.json();
    let totalItems = result.total_count > 999 ? 999 : result.total_count;
    maxPages = Math.ceil(totalItems / perPage.value);
    clear(results);
    result.items.forEach((user) => {
      const card = createCardUser(
        user.id,
        user.avatar_url,
        user.login,
        user.html_url,
        getRepos,
        addToFaves
      );
      results.appendChild(card);
    });
  }
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

export function clear(container) {
  while (container.firstChild) container.removeChild(container.firstChild);
}
