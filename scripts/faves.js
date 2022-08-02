import { customHeader } from "./customHeader.js";
import { createCardUser } from "./createCard.js";
import { getRepos } from "./getRepos.js";
import { clear } from "./index.js";

const resultDiv = document.querySelector(".faves #results");

let faves = localStorage.getItem("faves")
  ? JSON.parse(localStorage.getItem("faves"))
  : localStorage.setItem("faves", JSON.stringify({}));

faves = JSON.parse(localStorage.getItem("faves"));

// ================== FAVORITES FUNCTION ==================

let displayFaves = () => {};

export function addToFaves(e) {
  e.currentTarget.classList.toggle("true");
  const obj = e.currentTarget.parentNode;
  const user = {
    name: obj.childNodes[2].firstElementChild.innerText,
    avatar: obj.childNodes[0].firstElementChild.src,
    url: obj.childNodes[2].childNodes[3].href,
  };

  if (e.currentTarget.classList.contains("true")) {
    console.log(faves);
    faves[obj.id] = user;
  } else {
    delete faves[obj.id];
  }

  localStorage.setItem("faves", JSON.stringify(faves));

  if (/faves/.test(window.location.href)) {
    displayFaves();
  }
}

// ================== FAVORITES DISPLAY ==================

window.onload = () => {
  displayFaves = () => {
    clear(resultDiv);
    const faves = JSON.parse(localStorage.getItem("faves"));

    Object.entries(faves).forEach((user) => {
      const card = createCardUser(
        user[0],
        user[1].avatar,
        user[1].name,
        user[1].url,
        getRepos,
        addToFaves
      );
      resultDiv?.append(card);
    });
  };
  displayFaves();
};
