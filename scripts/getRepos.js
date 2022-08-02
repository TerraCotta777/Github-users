// ================== SEARCH REPOS ==================

import { createCardUser, createCardRepo } from "./createCard.js";
import { customHeader } from "./customHeader.js";
import { addToFaves } from "./faves.js";

const resultDiv = document.querySelector(".repositories #results");


const currentUser = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser"))
  : localStorage.setItem("currentUser", JSON.stringify(0));

	
export async function getRepos(e) {
  const id = e.currentTarget.offsetParent.id;
  localStorage.setItem("currentUser", JSON.stringify(id));
  window.location.href = "./repos.html";
}

window.onload = async () => {
  const userId = JSON.parse(localStorage.getItem("currentUser"));
  const queryString = "https://api.github.com/user/" + userId;

  // ================== GET USER INFO ==================

  const responseUser = await fetch(queryString);
  if (responseUser.ok) {
    const result = await responseUser.json();
    const card = createCardUser(
      result.id,
      result.avatar_url,
      result.login,
      result.html_url,
      getRepos,
      addToFaves
    );
    document.querySelector(".repositories__title")?.after(card);
  }

  // ================== GET USER REPOSITORIES ==================

  const responseRepos = await fetch(queryString + "/repos");
  if (responseRepos.ok) {
    const result = await responseRepos.json();
    result.forEach((repo) => {
      const card = createCardRepo(repo.name, repo.html_url);
      resultDiv?.append(card);
    });
  }
};
