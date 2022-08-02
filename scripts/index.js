import "./customHeader.js";
import { createCardUser } from "./createCard.js";
import { getRepos } from "./getRepos.js";
// import { faves } from "./faves.js";
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
  if (userName.value) {
    results.innerHTML = `<div class="loader"></div>`;
    let queryString = `${url}users?q=${userName.value}&per_page=${perPage.value}&page=${currentPageValue}&sort=${sort.value}&order=${order.value}`;
    try {
      const response = await fetch(queryString);
      if (response.ok) {
        const result = await response.json();
        if (result.total_count > 0) {
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
        } else if (result.total_count === 0) {
          results.innerHTML = `<p style="margin-top: 30px">User with this name wasn't found.</p>`;
        }
      } else {
        results.innerHTML = `<p style="margin-top: 30px">Error occurred. Error code - ${response.status}</p>`;
      }
    } catch (e) {
      console.log(e);
      results.innerHTML = `<p style="margin-top: 30px">${e.message}</p>`;
    }
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
