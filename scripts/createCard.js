export const createCard = (id, avatar, name, url, getRepos, someFunc) => {
  const card = document.createElement("div");
  card.classList.add("result__card", "card");
  card.setAttribute("id", id);
  card.innerHTML = `<div class="card__avatar">
			<img src="${avatar}" alt="user img" />
		</div>
		<div class="card__info">
			<h5 class="card__title">${name}</h5>
			<a href="${url}" class="card__user-link">link to Github</a>
		</div>`;
  const cardLink = document.createElement("div");
  cardLink.classList.add("card__link");
  const button = document.createElement("button");
  button.classList.add("card__button", "button");
  button.textContent = "Show repositories";
  button.addEventListener("click", getRepos);
  cardLink.appendChild(button);
  const isFave = document.createElement("div");
  isFave.classList.add("card__is-fav");
  isFave.innerHTML = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path d="M17.9524 6.46201C17.8959 6.29542 17.7917 6.14903 17.6529 6.04092C17.5141 5.93282 17.3466 5.86773 17.1712 5.85369L12.0403 5.44605L9.81998 0.5318C9.74927 0.373522 9.63426 0.239089 9.48882 0.144723C9.34338 0.0503584 9.17374 9.52785e-05 9.00037 1.35323e-07C8.82699 -9.50078e-05 8.6573 0.0499819 8.51176 0.144187C8.36622 0.238393 8.25106 0.3727 8.18017 0.530901L5.95986 5.44605L0.828929 5.85369C0.656537 5.86735 0.491731 5.93037 0.354225 6.03523C0.21672 6.14008 0.112338 6.28233 0.0535678 6.44494C-0.00520237 6.60756 -0.0158724 6.78366 0.0228342 6.95218C0.0615409 7.1207 0.147985 7.27451 0.271825 7.39519L4.06355 11.091L2.72254 16.897C2.68182 17.0728 2.69487 17.2567 2.76 17.4249C2.82512 17.5932 2.93932 17.738 3.08776 17.8405C3.23621 17.943 3.41205 17.9986 3.59247 18C3.77289 18.0013 3.94956 17.9485 4.09955 17.8482L9.00008 14.5816L13.9006 17.8482C14.0539 17.95 14.2347 18.0024 14.4187 17.9983C14.6026 17.9943 14.781 17.934 14.9297 17.8256C15.0784 17.7172 15.1903 17.5659 15.2504 17.392C15.3105 17.2181 15.3159 17.03 15.2659 16.8529L13.6198 11.0937L17.7022 7.42039C17.9695 7.17922 18.0676 6.80307 17.9524 6.46201Z" fill="white"/>
	</svg>`;
  isFave.addEventListener("click", someFunc);
  card.appendChild(cardLink);
  card.appendChild(isFave);
  return card;
};
